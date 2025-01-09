const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const authMiddleware = require("../middlewares/authMiddleware");

// Routes for wishlist
router.post(
  "/",
  authMiddleware.verifyBuyerToken,
  wishlistController.getWishlist
);

router.post(
  "/add",
  authMiddleware.verifyBuyerToken,
  wishlistController.addToWishlist
);

router.delete(
  "/remove/:productId",
  authMiddleware.verifyBuyerToken,
  wishlistController.removeFromWishlist
);

module.exports = router;
