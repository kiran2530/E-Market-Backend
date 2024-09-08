const Vendor = require("../models/Vendor");

const createVendor = async (vendorData) => {
  const vendor = new Vendor(vendorData);
  return await vendor.save();
};

const findVendorByEmail = async (email) => {
  return await Vendor.findOne({ email });
};

const findVendorByPhone = async (phone) => {
  return await Vendor.findOne({ phone });
};

module.exports = {
  createVendor,
  findVendorByEmail,
  findVendorByPhone,
};
