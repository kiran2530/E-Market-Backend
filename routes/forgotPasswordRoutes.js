require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Buyer = require("../models/Buyer");
const { resateBuyerPassword } = require("../controllers/buyerController");

let otpStorage = {}; // In-memory storage for OTPs (use a database in production)

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: "emarket.solutions24x7@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

const router = express.Router();

// route for send otp

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  const existing = await Buyer.findOne({ email: email });

  if (!existing) {
    return res.status(201).json({
      success: false,
      message: "User not exit with this email address",
    });
  }
  // Generate a 6-digit OTP
  const otp = crypto.randomInt(100000, 999999);

  // Save OTP with a short expiry (e.g., 5 minutes)
  otpStorage[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

  // Send OTP via email
  try {
    await transporter.sendMail({
      from: "E-Market <no-reply@emarket.com>",
      to: email,
      subject: "🔐 Reset Your E-Market Password - OTP Inside",
      text: `Dear ${existing.name.toUpperCase()},
    
    We received a request to reset your password for your E-Market account. To ensure your account’s security, please use the One-Time Password (OTP) below:
    
    ✨ Your Secure OTP: **${otp}** ✨
    
    ⚠️ This OTP is valid for **5 minutes**. Please do not share it with anyone.
    
    If you did not request this password reset, please ignore this email or contact our support team immediately to secure your account.
    
    For any assistance, reach out to our support team at 📧 **emarket.solutions24x7@gmail.com**.
    
    Stay safe,  
    **E-Market Support Team**  
    🌐 [Visit E-Market](https://e-market-frontend.onrender.com/)
      `,
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #2c3e50; text-align: center;">🔐 Password Reset Request</h2>
          <p>Dear <strong>${existing.name.toUpperCase()}</strong>,</p>
          <p>We received a request to reset your password for your <strong>E-Market</strong> account. To proceed, please use the One-Time Password (OTP) below:</p>
          <div style="background: #2c3e50; color: #ffffff; text-align: center; padding: 10px; border-radius: 5px; font-size: 20px; font-weight: bold;">
            ${otp}
          </div>
          <p style="margin-top: 15px;">⏳ <strong>This OTP is valid for 5 minutes.</strong> Please do not share it with anyone.</p>
          <p>If you did not request a password reset, please ignore this email or <a href="mailto:emarket.solutions24x7@gmail.com" style="color: #2980b9;">contact our support team</a> immediately.</p>
          <hr style="border: 0; height: 1px; background: #ddd;">
          <p style="text-align: center; font-size: 14px; color: #666;">
            📧 <a href="mailto:emarket.solutions24x7@gmail.com" style="color: #2980b9;">emarket.solutions24x7@gmail.com</a>
          </p>
          <p style="text-align: center; font-size: 14px;">
            🌐 <a href="https://e-market-frontend.onrender.com/" style="color: #2980b9; text-decoration: none;">Visit E-Market</a>
          </p>
        </div>
      </div>
      `,
    });

    res.json({ success: true, message: "OTP sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
});

// route for validate otp

router.post("/validate-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required." });
    }

    const storedOtp = otpStorage[email];

    // Validate OTP
    if (
      !storedOtp ||
      storedOtp.otp !== parseInt(otp) ||
      Date.now() > storedOtp.expires
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP." });
    }

    // Clear OTP from storage after successful validation
    delete otpStorage[email];

    return res.status(200).json({ success: true, message: "OTP Verified" });
  } catch (error) {
    console.error("Error in OTP validation:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.put("/resate-buyer-password", resateBuyerPassword);

module.exports = router;
