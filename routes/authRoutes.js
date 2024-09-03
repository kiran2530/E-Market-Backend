const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Buyer Authentication Routes
router.post("/buyer/register", authController.buyerRegister);
router.post('/buyer/login', authController.buyerLogin);

// Vendor Authentication Routes
router.post('/vendor/register', authController.vendorRegister);
router.post('/vendor/login', authController.vendorLogin);

module.exports = router;
