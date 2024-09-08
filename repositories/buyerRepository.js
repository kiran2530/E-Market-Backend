const Buyer = require("../models/Buyer");

const findBuyerByEmail = async (email) => {
  return await Buyer.findOne({ email });
};

const findBuyerByPhone = async (phone) => {
  try {
    return await Buyer.findOne({ phone });
  } catch (err) {
    // console.log(err);
  }
};

const createBuyer = async (buyerData) => {
  const buyer = new Buyer(buyerData);
  return await buyer.save();
};

module.exports = {
  findBuyerByEmail,
  findBuyerByPhone,
  createBuyer,
};
