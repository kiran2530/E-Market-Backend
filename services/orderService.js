const orderRepository = require("../repositories/orderRepository");

const getOrdersForBuyer = async (buyerId) => {
  const orders = await orderRepository.getOrdersForBuyer(buyerId);
  return orders;
};

const getOrdersForVendor = async (vendorId) => {
  const orders = await orderRepository.getOrdersForVendor(vendorId);
  return orders;
};

module.exports = {
  getOrdersForBuyer,
  getOrdersForVendor,
};
