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

exports.getLoggedInVendorDetails = async (req, res) => {
  try {
    const vendorId = req.vendorId;
    const vendorDetails = await vendorService.getVendorById(vendorId);
    if (!vendorDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }
    res.status(200).json({ success: true, vendorDetails });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.resetVendorPassword = async (req, res) => {
  const { email, newPassword } = req.body; // Only update email

  try {
    const updatedUser = await vendorService.resetVendorPassword(
      email,
      newPassword
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
