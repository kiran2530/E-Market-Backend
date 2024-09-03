// Imports
require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const connectToMongo = require("./config/Database");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require('./routes/productRoutes')

const app = express();

// connect to Database..
connectToMongo();

// Middleware setup
app.use(cors()); // This will enable CORS for all routes
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", authRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`server is live on http://localhost:${process.env.PORT}`);
});
