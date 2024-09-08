require("dotenv").config(); // Load environment variables from .env file
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const vendorRepository = require("../repositories/vendorRepository");

const registerVendor = async (vendorData) => {
  const { name, email, password, phone, address } = vendorData;

  // check vendor exist with email
  const existingVendorWithEmail = await vendorRepository.findVendorByEmail(
    email
  );

  if (existingVendorWithEmail) {
    return {
      success: false,
      message: "Vendor already exists with this email address",
    };
  }

  // check vendor exist with phone
  const existingVendorWithPhone = await vendorRepository.findVendorByPhone(
    phone
  );

  if (existingVendorWithPhone) {
    return {
      success: false,
      message: "Vendor already exists with this phone number",
    };
  }

  //  If buyer not exist then generate salt and hash the password using the bcriptjs and create new buyer and store into database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newVendor = {
    name,
    email,
    password: hashedPassword,
    phone,
    address,
  };

  await vendorRepository.createVendor(newVendor);

  return { success: true, message: "Vendor register successfully" };
};

const loginVendor = async (vendorData) => {
  const { email, password } = vendorData;

  const vendor = await vendorRepository.findVendorByEmail(email);

  if (!vendor) {
    return { success: false, message: "Invalid credentials" };
  }

  const passwordCompare = await bcrypt.compare(password, vendor.password);

  if (!passwordCompare) {
    return { success: false, message: "Invalid credentials" };
  }

  // Returns a JWT token
  const data = {
    vendorId: vendor._id,
  };

  const authToken = jwt.sign(data, process.env.JWT_SECRET);
  return { success: true, authToken: authToken, role: "vendor" };
};

module.exports = {
  registerVendor,
  loginVendor,
};
