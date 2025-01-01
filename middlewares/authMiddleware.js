require("dotenv").config(); // Load environment variables from .env file
const jwt = require("jsonwebtoken");

exports.verifyVendorToken = (req, res, next) => {
  const authToken = req.header("authToken");

  if (!authToken) {
    return res
      .status(401)
      .json({ success: false, message: "Please login to continue" });
  }
  try {
    const verifyToken = jwt.verify(authToken, process.env.JWT_SECRET);
    req.vendorId = verifyToken.vendorId;

    next();
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.verifyBuyerToken = (req, res, next) => {
  const authToken = req.header("authToken");

  if (!authToken) {
    return res
      .status(401)
      .json({ success: false, message: "Please login to continue" });
  }
  try {
    const verifyToken = jwt.verify(authToken, process.env.JWT_SECRET);
    req.buyerId = verifyToken.buyerId;

    next();
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
