const Buyer = require("../models/Buyer");
const mongoose = require("mongoose");
const productModel = require("../models/Product");

const findBuyerByEmail = async (email) => {
  return await Buyer.findOne({ email });
};

const findBuyerByPhone = async (phone) => {
  try {
    return await Buyer.findOne({ phone });
  } catch (err) {}
};

const createBuyer = async (buyerData) => {
  const buyer = new Buyer(buyerData);
  return await buyer.save();
};

const addToCart = async (buyerId, productId, quantity) => {
  let buyer = await Buyer.findById(buyerId);
  if (!buyer) {
    throw new Error("Buyer not found");
  }

  const product = await productModel.findById(productId);
  if (!product) {
    throw new Error("Buyer not found");
  }

  const existingItemIndex = buyer.cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (existingItemIndex >= 0) {
    // If the product is already in the cart, increment the quantity
    const updatedBuyer = await Buyer.findByIdAndUpdate(
      buyerId,
      {
        $set: {
          [`cart.items.${existingItemIndex}.quantity`]:
            buyer.cart.items[existingItemIndex].quantity + quantity,
        },
      },
      { new: true } // Return the updated document
    );
    return {
      success: true,
      message: "Product quantity updated",
      cart: updatedBuyer.cart,
    };
  } else {
    // Find the buyer and update the cart using Mongoose's findByIdAndUpdate method
    const updatedBuyer = await Buyer.findByIdAndUpdate(
      buyerId,
      {
        $push: {
          "cart.items": {
            productId,
            quantity,
          },
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedBuyer) {
      return { success: false, message: "Buyer not found" };
    }
  }

  return { success: true, message: "Item added to cart", cart: buyer.cart };
};

const removeFromCart = async (buyerId, productId) => {
  const buyer = await Buyer.findById(buyerId);
  if (!buyer) {
    throw new Error("Buyer not found");
  }

  buyer.cart.items = buyer.cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await buyer.save();
  return { success: true, message: "Item removed from cart", cart: buyer.cart };
};

// Repository function to fetch a buyer's cart items with product details
const getBuyerCart = async (buyerId) => {
  try {
    // Find buyer by ID and populate the product details in cart items
    const buyer = await Buyer.findById(buyerId).populate(
      "cart.items.productId",
      "name price priceCategory description image.imageUrl"
    );

    if (!buyer) {
      return null; // Return null if the buyer is not found
    }

    return buyer.cart.items; // Return the populated cart items
  } catch (error) {
    console.error("Error in buyerRepository.getBuyerCart:", error);
    throw error;
  }
};

const findById = async (buyerId) => {
  return await Buyer.findById(buyerId).select("-password"); // Exclude the password field
};

const resateBuyerPassword = async (email, newPassword) => {
  try {
    return await Buyer.findOneAndUpdate(
      { email: email },
      { $set: { password: newPassword } },
      { new: true }
    );
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

module.exports = {
  findBuyerByEmail,
  findBuyerByPhone,
  createBuyer,
  addToCart,
  removeFromCart,
  getBuyerCart,
  findById,
  resateBuyerPassword,
};
