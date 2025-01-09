const wishlistRepository = require("../repositories/wishlistRepository");

const getWishlist = async (buyerId) => {
  return await wishlistRepository.getWishlist(buyerId);
};

const addToWishlist = async (buyerId, productId) => {
  return await wishlistRepository.addToWishlist(buyerId, productId);
};

const removeFromWishlist = async (buyerId, productId) => {
  return await wishlistRepository.removeFromWishlist(buyerId, productId);
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
