const buyerService = require("../services/buyerService");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const buyerId = req.buyerId;
    const result = await buyerService.addToCart(buyerId, productId, quantity);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const buyerId = req.buyerId;
    const result = await buyerService.removeFromCart(buyerId, productId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle the request for fetching cart items
exports.getCart = async (req, res) => {
  const buyerId = await req.buyerId;
  try {
    // Call the service to fetch cart items
    const cartItems = await buyerService.getCartItems(buyerId);

    if (!cartItems) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    return res.status(200).json({
      message: "Cart fetched successfully",
      cart: cartItems,
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};