const orderProductModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const allOrderController = async (request, response) => {
  const userId = request.userId;

  const user = await userModel.findById(userId);

  if (user?.role !== "ADMIN") {
    return response.status(500).json({
      message: "Access Denied",
    });
  }

  const allOrders = await orderProductModel.find().sort({ createdAt: -1 });

  return response.status(200).json({
    data: allOrders,
    success: true,
  });
};

module.exports = allOrderController;
