const productService = require("../services/productService");

//Route 1 : Create a new product (Vendor only)
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createNewProduct(
      req.body,
      req.file,
      req.vendorId
    );
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
  const file = req.file;
  const vendorId = req.vendorId;

  try {
    const updatedProduct = await productService.updateExistingProduct(
      productId,
      updates,
      file,
      vendorId
    );

    res.status(201).json({
      success: true,
      message: "Product update Successfully",
      updatedProduct: updatedProduct,
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
    const deletedProduct = await productService.deleteExistingProduct(
      productId,
      req.vendorId
    );
    res.status(201).json({
      success: true,
      message: "Product Deleted Successfully",
      deletedProduct,
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
    const products = await productService.getAllProducts();
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
    const product = await productService.getProductById(productId);

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
