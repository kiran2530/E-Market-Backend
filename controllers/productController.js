const Product = require("../models/Product");

// Create a new product (Vendor only)
exports.createProduct = async (req, res) => {
  const { name, description, price, quantity, category, subCategory, status } =
    req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      category,
      subCategory,
      status,
      vendorId: req.vendorId,
    });
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product save Successfully",
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
    const updateProduct = await Product.findOneAndUpdate(
      { _id: productId, vendorId: req.vendorId },
      updates,
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
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
