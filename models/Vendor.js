const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  ratings: {
    averageRating: { type: Number, default: 0 },
    numberOfRatings: { type: Number, default: 0 },
  },
  paymentDetails: {
    bankAccountNumber: { type: String },
    bankName: { type: String },
    ifscCode: { type: String },
    upiId: { type: String },
  },
  otp: { type: String },
  otpExpire: { type: Date },
});

const vendorModel = mongoose.model("Vendor", vendorSchema);

module.exports = vendorModel;
