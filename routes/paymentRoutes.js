const express = require("express");
const router = express.Router();
const { buyNow, paymentSuccess } = require("../controllers/paymentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/buy-now", authMiddleware.verifyBuyerToken, buyNow);
router.post(
  "/payment-success",
  authMiddleware.verifyBuyerToken,
  paymentSuccess
);

module.exports = router;
