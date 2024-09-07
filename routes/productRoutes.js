const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");
const multer = require("multer");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({});
const upload = multer({ storage });

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

module.exports = router;
