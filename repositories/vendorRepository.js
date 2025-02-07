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

const findVendorById = async (vendorId) => {
  return await Vendor.findById(vendorId).select("-password");
};

const resetVendorPassword = async (email, newPassword) => {
  try {
    return await Vendor.findOneAndUpdate(
      { email: email },
      { $set: { password: newPassword } },
      { new: true }
    );
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

module.exports = {
  createVendor,
  findVendorByEmail,
  findVendorByPhone,
  findVendorById,
  resetVendorPassword,
};
