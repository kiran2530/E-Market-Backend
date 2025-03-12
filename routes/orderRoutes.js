const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const orderController = require("../controllers/orderController");

router.post(
  "/buyer/get",
  authMiddleware.verifyBuyerToken,
  orderController.getOrdersForBuyer
);

router.post(
  "/vendor/get",
  authMiddleware.verifyVendorToken,
  orderController.getOrdersForVendor
);

module.exports = router;
