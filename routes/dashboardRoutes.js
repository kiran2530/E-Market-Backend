const express = require("express");
const router = express.Router();
const { getDashboardData } = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware.verifyVendorToken, getDashboardData);

module.exports = router;
