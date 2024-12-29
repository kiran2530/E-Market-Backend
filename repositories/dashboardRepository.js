const Product = require("../models/Product");
const Order = require("../models/Order");
const Vendor = require("../models/Vendor");

// Fetch total sales for the given period
const getTotalSales = async (vendorId, startDate, endDate) => {
  const result = await Order.aggregate([
    {
      $match: {
        vendorId,
        status: "completed",
        dateAdded: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" },
      },
    },
  ]);
  return result[0]?.total || 0;
};

// Fetch count of pending orders for the given period
const getOrdersPending = async (vendorId, startDate, endDate) => {
  return await Order.countDocuments({
    vendorId,
    status: "pending",
    dateAdded: { $gte: startDate, $lt: endDate },
  });
};

// Fetch count of products listed for the given period
const getProductsListed = async (vendorId, startDate, endDate) => {
  return await Product.countDocuments({
    vendorId,
    dateAdded: { $gte: startDate, $lt: endDate },
  });
};

// Fetch average rating of the vendor
const getAverageRating = async (vendorId) => {
  const vendor = await Vendor.findById(vendorId);
  return vendor?.ratings?.averageRating || 0;
};

module.exports = {
  getTotalSales,
  getOrdersPending,
  getProductsListed,
  getAverageRating,
};
