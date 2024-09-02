require("dotenv").config(); // Load environment variables from .env file
const Buyer = require("../models/Buyer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Route 1 :  Route for buyer registration or signup

exports.buyerRegister = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    const existingBuyer = await Buyer.findOne({ email: email });

    if (existingBuyer) {
      return res
        .status(400)
        .json({ success: false, message: "Buyer already exists" });
    }

    //  If buyer not exist then generate salt and hash the password using the bcriptjs and create new buyer and store into database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newBuyer = Buyer({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    const saveBuyer = await newBuyer.save();

    res
      .status(201)
      .json({ success: true, message: "Buyer register successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Route 2 :  Route for buyer login which Authenticates a buyer and returns a JWT token

exports.buyerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const buyer = await Buyer.findOne({ email });

    if (!buyer) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, buyer.password);

    if (!passwordCompare) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Returns a JWT token
    const data = {
      buyerId: buyer._id,
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ authToken: authToken });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Route 3 :  Route for vendor registration or signup