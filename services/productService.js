const {
  uploadImageToCloudinary,
  deleteImageOfCloudinary,
} = require("../utils/cloudinaryUtils");
const productRepository = require("../repositories/productRepository");

// get all products
const getAllProducts = async () => {
  return await productRepository.findAllProduct();
};

// get product by id
const getProductById = async (productId) => {
  return await productRepository.findProductById(productId);
};

// create new product
const createNewProduct = async (productData, file, vendorId) => {
  // Upload image to Cloudinary
  const imageUpload = await uploadImageToCloudinary(file);

  const newProduct = {
    ...productData,
    vendorId: vendorId,
    image: imageUpload,
  };

  return await productRepository.createProduct(newProduct);
};

// update product
const updateExistingProduct = async (productId, updates, file, vendorId) => {
  const product = await productRepository.findProductByVendor(
    productId,
    vendorId
  );

  if (!product) {
    throw new Error("Product not found Or you are not allow to update");
  }

  if (file) {
    // Delete the old image from Cloudinary
    if (product.image.public_id) {
      await deleteImageOfCloudinary(product.image.public_id);
    }

    // Update the product image URL and image public ID
    updates.image = await uploadImageToCloudinary(file);
  }

  return await productRepository.updateProduct(productId, vendorId, updates);
};

// Delete product
const deleteExistingProduct = async (productId, vendorId) => {
  const product = await productRepository.findProductById(productId);

  if (!product) {
    throw new Error("Product Not found");
  }

  if (product.vendorId.toString() !== vendorId) {
    throw new Error("You are not authorized to delete this product");
  }

  if (product.image.public_id) {
    await deleteImageOfCloudinary(product.image.public_id);
  }

  return await productRepository.deleteProduct(productId);
};

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateExistingProduct,
  deleteExistingProduct,
};
