const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");
const multer = require("multer");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Routes for vendors
router.post(
  "/vendor/create",
  authMiddleware.verifyVendorToken,
  upload.single("image"),
  productController.createProduct
);

router.put(
  "/vendor/update/:productId",
  authMiddleware.verifyVendorToken,
  upload.single("image"),
  productController.updateProduct
);

router.delete(
  "/vendor/delete/:productId",
  authMiddleware.verifyVendorToken,
  productController.deleteProduct
);

// Routes for buyers
router.get("/buyer/products", productController.getAllProducts);
router.get("/buyer/product/:productId", productController.getProductById);

module.exports = router;
