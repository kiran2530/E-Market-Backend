const buyerService = require("../services/buyerService");
const vendorService = require("../services/vendorService");

//Route 1 :  Route for buyer registration or signup

exports.buyerRegister = async (req, res) => {
  try {
    const result = await buyerService.registerBuyer(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Route 2 :  Route for buyer login which Authenticates a buyer and returns a JWT token

exports.buyerLogin = async (req, res) => {
  try {
    const result = await buyerService.loginBuyer(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Route 3 :  Route for vendor registration or signup

exports.vendorRegister = async (req, res) => {
  try {
    const result = await vendorService.registerVendor(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Route 4 :  Route for Vendors login which Authenticates a vendors and returns a JWT token

exports.vendorLogin = async (req, res) => {
  try {
    const result = await vendorService.loginVendor(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
