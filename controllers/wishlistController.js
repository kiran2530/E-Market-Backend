const wishlistService = require("../services/wishlistService");

const getWishlist = async (req, res) => {
  try {
    const buyerId = req.buyerId; // Assume buyer is authenticated

    const wishlist = await wishlistService.getWishlist(buyerId);
    res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const buyerId = req.buyerId; // Assume buyer is authenticated

    const { productId } = req.body;

    const result = await wishlistService.addToWishlist(buyerId, productId);
    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      newProduct: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const buyerId = req.buyerId; // Assume buyer is authenticated
    const { productId } = req.params;
    const result = await wishlistService.removeFromWishlist(buyerId, productId);
    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
