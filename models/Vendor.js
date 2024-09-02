const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    unique: true,
  },
  ownerName: {
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
  contactNumber: {
    type: String,
    required: true,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  products: [ProductSchema], // Array of products managed by the vendor
  businessDescription: {
    type: String,
  },
  businessLogo: {
    type: String, // URL or path to the business logo
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
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
});

const vendorModel = mongoose.model("vendors", vendorSchema)

module.exports = vendorModel;