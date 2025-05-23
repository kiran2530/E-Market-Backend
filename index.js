// Imports
require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectToMongo = require("./config/Database");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const buyerRoutes = require("./routes/buyerRoutes");
const wishlistrotes = require("./routes/wishlistRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const orderRoutes = require("./routes/orderRoutes");

const Order = require("./models/Order");

const app = express();

const corsOptions = {
  origin: ["https://e-market-frontend.onrender.com", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "authToken"],
};

// connect to Database..
connectToMongo();

// Middleware setup
app.use(cors(corsOptions)); // This will enable CORS for all routes
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
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/cart", buyerRoutes);
app.use("/api/wishlist", wishlistrotes);
app.use("/api/forgotPass", forgotPasswordRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`server is live on http://localhost:${process.env.PORT}`);
});
