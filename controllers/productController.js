const Product = require("../models/Product");
const {
  uploadImageToCloudinary,
  deleteImageOfCloudinary,
} = require("../utils/cloudinaryUtils");

//Route 1 : Create a new product (Vendor only)
exports.createProduct = async (req, res) => {
  const { name, description, price, quantity, category, subCategory, status } =
    req.body;

  try {
    // Upload image to Cloudinary
    const imageUpload = await uploadImageToCloudinary(req.file);

    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      category,
      subCategory,
      status,
      vendorId: req.vendorId,
      image: imageUpload,
    });
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product save Successfully",
      newProduct: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

//Route 2 : Update an existing product (Vendor only)
exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findOne({
      _id: productId,
      vendorId: req.vendorId,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found Or you are not allow to update",
      });
    }

    if (req.file) {
      // Delete the old image from Cloudinary
      if (product.image.public_id) {
        await deleteImageOfCloudinary(product.image.public_id);
      }

      // Update the product image URL and image public ID
      updates.image = await uploadImageToCloudinary(req.file);
    }

    const updateProduct = await Product.findOneAndUpdate(
      { _id: productId, vendorId: req.vendorId },
      { $set: updates },
      { new: true }
    );

    if (!updateProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found or not authorized",
      });
    }
    res.status(201).json({
      success: true,
      message: "Product update Successfully",
      updateProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

// Route 3 : Delete an existing product (Vendor only)
exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.vendorId.toString() !== req.vendorId) {
      return res.status(404).json({
        success: false,
        message: "You are not authorized",
      });
    }

    // Delete the old image from Cloudinary
    if (product.image.public_id) {
      await deleteImageOfCloudinary(product.image.public_id);
    }

    const result = await Product.findByIdAndDelete({ _id: productId });
    res.status(201).json({
      success: true,
      message: "Product Deleted Successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

// Route 4 : Get all products (Buyer)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json(products);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

// Route 5 : Get a product by ID (Buyer)
exports.getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};
