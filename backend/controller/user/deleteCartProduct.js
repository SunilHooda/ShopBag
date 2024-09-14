const addToCartModel = require("../../models/cartProductModel");

const deleteCartProduct = async (req, res) => {
  try {
    const currentUser = req.userId;
    const productId = req.body._id;

    const deleteProduct = await addToCartModel.deleteOne({ _id: productId });

    res.status(200).json({
      message: "Product Deleted From Cart",
      error: false,
      success: true,
      data: deleteProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteCartProduct;
