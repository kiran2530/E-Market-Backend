const dashboardService = require("../services/dashboardService");

const getDashboardData = async (req, res) => {
  try {
    const { period } = req.body;
    const vendorId = req.vendorId;

    if (!vendorId || !period) {
      return res
        .status(400)
        .json({ success: false, error: "Vendor ID and period are required." });
    }

    const salesData = await dashboardService.getDashboardData(vendorId, period);

    res.status(200).json({ success: true, salesData });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};

module.exports = { getDashboardData };
