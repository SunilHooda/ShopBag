const orderProductModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const allOrderController = async (request, response) => {
  try {
    const userId = request.userId;

    // Check if the user is an admin
    const user = await userModel.findById(userId);
    if (user?.role !== "ADMIN") {
      return response.status(403).json({
        message: "Access Denied",
        success: false,
      });
    }

    // Pagination logic
    const page = parseInt(request.query.page) || 1; // Current page, default is 1
    const limit = parseInt(request.query.limit) || 5; // Number of orders per page, default is 5
    const skip = (page - 1) * limit; // Number of documents to skip for pagination

    // Fetching the total number of orders for pagination
    const totalOrders = await orderProductModel.countDocuments();

    // Fetching the orders with pagination
    const allOrders = await orderProductModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Calculating the total number of pages
    const totalPages = Math.ceil(totalOrders / limit);

    return response.status(200).json({
      data: allOrders,
      success: true,
      totalOrders,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "An error occurred while fetching orders.",
      success: false,
    });
  }
};

module.exports = allOrderController;
