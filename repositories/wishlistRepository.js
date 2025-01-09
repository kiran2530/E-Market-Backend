const Buyer = require("../models/Buyer");

const getWishlist = async (buyerId) => {
  const buyer = await Buyer.findById(buyerId).populate("wishlist");
  return buyer ? buyer.wishlist : [];
};

const addToWishlist = async (buyerId, productId) => {
  const buyer = await Buyer.findById(buyerId);
  if (!buyer.wishlist.includes(productId)) {
    buyer.wishlist.push(productId);
    await buyer.save();
  }
  return buyer.wishlist;
};

const removeFromWishlist = async (buyerId, productId) => {
  const buyer = await Buyer.findById(buyerId);

  // Check if wishlist is an array of ObjectIds
  if (!Array.isArray(buyer.wishlist)) {
    throw new Error("Wishlist is not an array");
  }

  buyer.wishlist = buyer.wishlist.filter((id) => id.toString() !== productId);

  // Mark the wishlist as modified before saving
  buyer.markModified("wishlist");

  await buyer.save();
  return buyer.wishlist;
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
