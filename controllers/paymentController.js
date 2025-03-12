const {
  createRazorpayOrder,
  verifyPayment,
  createOrder,
} = require("../services/paymentService");

exports.buyNow = async (req, res) => {
  try {
    const orderData = req.body;

    orderData.buyerId = req.buyerId;

    if (
      !orderData.buyerId ||
      !orderData.products ||
      !orderData.totalAmount ||
      !orderData.shippingAddress
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = await createRazorpayOrder(orderData);

    res.json({
      orderId: order.id,
      currency: "INR",
      amount: order.amount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.paymentSuccess = async (req, res) => {
  try {
    const paymentData = req.body;

    paymentData.buyerId = req.buyerId;
    

    const isValid = await verifyPayment(paymentData);
    if (!isValid) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const newOrder = await createOrder({
      buyerId: paymentData.buyerId,
      products: paymentData.products,
      totalAmount: paymentData.totalAmount,
      shippingAddress: paymentData.shippingAddress,
      status: "Processing",
      paymentStatus: "Paid",
    });

    res.json({ message: "Payment successful, order created", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
