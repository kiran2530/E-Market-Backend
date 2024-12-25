const Product = require("../models/Product");
const Vendor = require("../models/Vendor");

const findAllProduct = async () => {
  return await Product.find();
};

const findProductById = async (productId) => {
  return await Product.findById(productId);
};

const findProductByVendorId = async (vendorId) => {
  return await Product.find({ vendorId: vendorId });
};

const findProductByVendor = async (productId, vendorId) => {
  return await Product.findOne({ _id: productId, vendorId: vendorId });
};

const createProduct = async (productData) => {
  const newProduct = new Product(productData);
  const savedProduct = await newProduct.save();

  await Vendor.findByIdAndUpdate(
    productData.vendorId,
    { $push: { products: savedProduct._id } },
    { new: true }
  );
  return savedProduct;
};

const updateProduct = async (productId, vendorId, updates) => {
  return await Product.findOneAndUpdate(
    { _id: productId, vendorId: vendorId },
    { $set: updates },
    { new: true }
  );
};

const deleteProduct = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};

module.exports = {
  findAllProduct,
  findProductById,
  createProduct,
  findProductByVendor,
  updateProduct,
  deleteProduct,
  findProductByVendorId,
};
