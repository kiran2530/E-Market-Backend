const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  image: {
    imageUrl: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
  status: {
    type: String,
    required: true,
  },
  vendorId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
