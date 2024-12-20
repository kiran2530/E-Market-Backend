const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Buyer Authentication Routes
router.post("/buyer/register", authController.buyerRegister);
router.post("/buyer/login", authController.buyerLogin);

// Vendor Authentication Routes
router.post("/vendor/register", authController.vendorRegister);
router.post("/vendor/login", authController.vendorLogin);

// Vendor details Route
router.get(
  "/vendor/details",
  authMiddleware.verifyVendorToken,
  authController.getLoggedInVendorDetails
);

module.exports = router;
