const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const {
  createOrder,
  updateOrderStatus,
} = require("../repositories/orderRepository");

const createRazorpayOrder = async (orderData) => {
  const options = {
    amount: orderData.totalAmount * 100, // Convert to paisa
    currency: "INR",
    payment_capture: 1,
  };

  //   return await razorpay.orders.create(options);
  try {
    const razorpayOrder = await razorpay.orders.create(options);

    // Save the order in the DB
    // await createOrder(orderData);
    return razorpayOrder;
  } catch (error) {
    throw new Error("Error creating Razorpay order");
  }
};

const verifyPayment = async (paymentData) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    paymentData;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new Error("Payment verification failed");
  }

  // Update the order status to Paid

  return true;

  //   const updatedOrder = await updateOrderStatus(razorpay_order_id, "Processing");
  //   return updatedOrder;
};

module.exports = { createRazorpayOrder, verifyPayment, createOrder };
