const mongoose = require("mongoose");
const Order = require("../models/Order");
const Buyer = require("../models/Buyer");

const createOrder = async (orderData) => {
  const newOrder = new Order(orderData);
  await newOrder.save();

  // Update Buyer's order history
  await Buyer.findByIdAndUpdate(orderData.buyerId, {
    $push: { orders: { orderId: newOrder._id } },
  });

  return newOrder;
};

const updateOrderStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(orderId) },
    { status },
    { new: true }
  );
};

const getOrdersForBuyer = async (buyerId) => {
  const orders = await Order.find({ buyerId })
    .populate("products.productId", "name image.imageUrl") // Fetch product details
    .populate("products.vendorId", "name email"); // Fetch vendor details

  // console.log(orders);

  return orders;
};

const getOrdersForVendor = async (vendorId) => {
  try {
    const orders = await Order.find({
      "products.vendorId": vendorId, // Filter orders where at least one product belongs to the vendor
    })
      .populate("products.productId", "name image.imageUrl") // Fetch product details
      .populate("buyerId", "name email"); // Fetch buyer details

    // Filter out products that do not belong to the vendor
    const filteredOrders = orders
      .map((order) => {
        const filteredProducts = order.products.filter(
          (product) => product.vendorId.toString() === vendorId.toString()
        );

        if (filteredProducts.length > 0) {
          return {
            ...order.toObject(),
            products: filteredProducts, // Only include the vendor's products
          };
        }
        return null; // Exclude orders that have no matching products
      })
      .filter((order) => order !== null); // Remove null values

    return filteredOrders;
  } catch (error) {
    console.error("Error fetching vendor orders:", error);
    throw error;
  }
};

module.exports = {
  createOrder,
  updateOrderStatus,
  getOrdersForBuyer,
  getOrdersForVendor,
};
