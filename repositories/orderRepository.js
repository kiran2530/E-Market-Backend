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

module.exports = { createOrder, updateOrderStatus };
