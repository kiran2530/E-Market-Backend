const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCart,
  getUserInfo
} = require("../controllers/buyerController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Add to cart
router.post("/add", authMiddleware.verifyBuyerToken, addToCart);

// Remove from cart
router.post("/remove", authMiddleware.verifyBuyerToken, removeFromCart);

router.get("/items", authMiddleware.verifyBuyerToken, getCart);

router.get('/info', authMiddleware.verifyBuyerToken, getUserInfo);

module.exports = router;
