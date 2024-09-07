const Product = require("../models/Product");
const cloudinary = require("../config/cloudinaryConfig");

// Create a new product (Vendor only)
exports.createProduct = async (req, res) => {
  const { name, description, price, quantity, category, subCategory, status } =
    req.body;

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "emarketproducts",
    });

    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      category,
      subCategory,
      status,
      vendorId: req.vendorId,
      image: {
        imageUrl: result.secure_url,
        public_id: result.public_id,
      },
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
      message: "Server error",
    });
  }
};

// Update an existing product (Vendor only)
exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findOne({
      _id: productId,
      vendorId: req.vendorId,
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found Or you are not allow to update" });
    }

    if (req.file) {
      // Delete the old image from Cloudinary
      if (product.image.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "emarketproducts",
      });

      // Update the product image URL and image public ID
      updates.image = {
        imageUrl: result.secure_url,
        public_id: result.public_id,
      };
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
      message: "Server error",
    });
  }
};
