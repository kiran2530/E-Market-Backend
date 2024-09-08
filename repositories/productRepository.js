const Product = require("../models/Product");

const findAllProduct = async () => {
  return await Product.find();
};

const findProductById = async (productId) => {
  return await Product.findById(productId);
};

const findProductByVendor = async (productId, vendorId) => {
  return await Product.findOne({ _id: productId, vendorId: vendorId });
};

const createProduct = async (productData) => {
  const newProduct = new Product(productData);
  return await newProduct.save();
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
};
