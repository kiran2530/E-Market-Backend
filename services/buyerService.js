require("dotenv").config(); // Load environment variables from .env file
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const buyerRepository = require("../repositories/buyerRepository");

const registerBuyer = async (buyerData) => {
  const { name, email, password, phone, address } = buyerData;

  // check buyer exist by this email
  const existingBuyerWithEmail = await buyerRepository.findBuyerByEmail(email);

  if (existingBuyerWithEmail) {
    return {
      success: false,
      message: "Buyer already exists with this email address",
    };
  }

  // check buyer exist by this phone
  const existingBuyerWithPhone = await buyerRepository.findBuyerByPhone(phone);

  if (existingBuyerWithPhone) {
    return {
      success: false,
      message: "Buyer already exists with this phone number",
    };
  }

  //  If buyer not exist then generate salt and hash the password using the bcriptjs and create new buyer and store into database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newBuyer = {
    name,
    email,
    password: hashedPassword,
    phone,
    address,
  };

  await buyerRepository.createBuyer(newBuyer);

  return { success: true, message: "Buyer register successfully" };
};

const loginBuyer = async (buyerData) => {
  const { email, password } = buyerData;

  const buyer = await buyerRepository.findBuyerByEmail(email);

  if (!buyer) {
    return { success: false, message: "Invalid credentials" };
  }

  const passwordCompare = await bcrypt.compare(password, buyer.password);

  if (!passwordCompare) {
    return { success: false, message: "Invalid credentials" };
  }

  // Returns a JWT token
  const data = {
    buyerId: buyer._id,
  };

  const authToken = jwt.sign(data, process.env.JWT_SECRET);
  return { success: true, authToken: authToken, role: "buyer" };
};

module.exports = {
  registerBuyer,
  loginBuyer,
};