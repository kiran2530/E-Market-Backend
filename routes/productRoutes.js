const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");

router.post(
  "/vendor/create",
  authMiddleware.verifyVendorToken,
  productController.createProduct
);

router.put(
  "/vendor/update/:productId",
  authMiddleware.verifyVendorToken,
  productController.updateProduct
);

module.exports = router;
