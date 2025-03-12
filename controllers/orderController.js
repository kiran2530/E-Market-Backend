const orderService = require("../services/orderService");

const getOrdersForBuyer = async (req, res) => {
  try {
    const buyerId = req.buyerId;

    const orders = await orderService.getOrdersForBuyer(buyerId);
    console.log(orders);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrdersForVendor = async (req, res) => {
  try {
    const vendorId = req.vendorId;

    const orders = await orderService.getOrdersForVendor(vendorId);
    console.log(orders);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getOrdersForBuyer,
  getOrdersForVendor,
};
