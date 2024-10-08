// Imports
require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectToMongo = require("./config/Database");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// connect to Database..
connectToMongo();

// Middleware setup
app.use(cors()); // This will enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use("/", (req, res) => {
//   return res.json({
//     massage: "Welcome to E-market",
//   });
// });
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`server is live on http://localhost:${process.env.PORT}`);
});
