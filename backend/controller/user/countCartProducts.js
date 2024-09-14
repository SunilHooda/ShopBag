const addToCartModel = require("../../models/cartProductModel");

const countCartProducts = async (req, res) => {
  try {
    const userId = req.userId;

    const count = await addToCartModel.countDocuments({ userId: userId });

    res.status(200).json({
      data: {
        count: count,
      },
      message: "ok",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: false,
      success: false,
    });
  }
};

module.exports = countCartProducts;
