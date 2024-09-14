const addToCartModel = require("../../models/cartProductModel");

const viewCartproducts = async (req, res) => {
  try {
    const currentUser = req.userId;

    const allCartProducts = await addToCartModel
      .find({ userId: currentUser })
      .populate("productId");

    res.status(200).json({
      message: "Single User Cart Products",
      success: true,
      error: false,
      data: allCartProducts,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = viewCartproducts;
