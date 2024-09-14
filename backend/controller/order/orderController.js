const orderProductModel = require("../../models/orderProductModel");

const orderController = async (request, response) => {
  try {
    const currentUserId = request.userId;

    const orderList = await orderProductModel
      .find({ userId: currentUserId })
      .sort({ createdAt: -1 });

    response.status(200).json({
      data: orderList,
      message: "Order List",
      success: true,
      error: false,
    });
  } catch (err) {
    response.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = orderController;
