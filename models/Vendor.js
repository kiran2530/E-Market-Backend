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
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
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
});

const vendorModel = mongoose.model("vendors", vendorSchema);

module.exports = vendorModel;
