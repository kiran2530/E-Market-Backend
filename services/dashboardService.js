const dashboardRepository = require("../repositories/dashboardRepository");

const getDashboardData = async (vendorId, period) => {
  const currentEndDate = new Date();
  let currentStartDate, lastStartDate;

  // Calculate the start date based on the period
  if (period === "daily") {
    currentStartDate = new Date(currentEndDate);
    currentStartDate.setDate(currentEndDate.getDate() - 1);
    lastStartDate = new Date(currentEndDate);
    lastStartDate.setDate(currentEndDate.getDate() - 2);
  } else if (period === "weekly") {
    currentStartDate = new Date(currentEndDate);
    currentStartDate.setDate(currentEndDate.getDate() - 7);
    lastStartDate = new Date(currentEndDate);
    lastStartDate.setDate(currentEndDate.getDate() - 14);
  } else if (period === "monthly") {
    currentStartDate = new Date(currentEndDate);
    currentStartDate.setMonth(currentEndDate.getMonth() - 1);
    lastStartDate = new Date(currentEndDate);
    lastStartDate.setMonth(currentEndDate.getMonth() - 2);
  } else {
    throw new Error("Invalid period specified.");
  }

  // Fetch data from the repository
  const totalSales = await dashboardRepository.getTotalSales(
    vendorId,
    currentStartDate,
    currentEndDate
  );

  const lastTotalSales = await dashboardRepository.getTotalSales(
    vendorId,
    lastStartDate,
    currentStartDate
  );

  const ordersPending = await dashboardRepository.getOrdersPending(
    vendorId,
    currentStartDate,
    currentEndDate
  );

  const lastOrdersPending = await dashboardRepository.getOrdersPending(
    vendorId,
    lastStartDate,
    currentStartDate
  );

  const productsListed = await dashboardRepository.getProductsListed(
    vendorId,
    currentStartDate,
    currentEndDate
  );

  const lastProductListed = await dashboardRepository.getProductsListed(
    vendorId,
    lastStartDate,
    currentStartDate
  );

  const averageRating = await dashboardRepository.getAverageRating(vendorId);

  let productPecentage = 100;
  let salesPercentage = 100;
  let ordersPendingPercentage = 100;

  if (lastProductListed != 0) {
    productPecentage =
      ((productsListed - lastProductListed) / lastProductListed) * 100;
  }

  if (lastTotalSales != 0) {
    productPecentage = ((totalSales - lastTotalSales) / lastTotalSales) * 100;
  }

  if (lastOrdersPending != 0) {
    productPecentage =
      ((ordersPending - lastOrdersPending) / lastOrdersPending) * 100;
  }

  return {
    totalSale: {
      totalCount: totalSales,
      percentage: salesPercentage,
    },
    ordersPending: {
      totalCount: ordersPending,
      percentage: ordersPendingPercentage,
    },
    productsList: {
      totalCount: productsListed,
      percentage: productPecentage,
    },
    averageRating,
  };
};

module.exports = { getDashboardData };
