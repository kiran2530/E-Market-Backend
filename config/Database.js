require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");

// MongoDB connection string
const MONGO_URI = process.env.MONGODB_URI;

const connectToMongo = async () => {
  try {
    const response = await mongoose.connect(MONGO_URI);
    console.log("MongoDB connect successfully....");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
