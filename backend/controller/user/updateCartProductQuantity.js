const addToCartModel = require("../../models/cartProductModel");

const updateCartProductQuantity = async (req, res) => {
  try {
    const currentUser = req.userId;
    const productId = req.body._id;
    const qty = req.body.quantity;

    const updateProduct = await addToCartModel.updateOne(
      { _id: productId },
      {
        ...(qty && { quantity: qty }),
      }
    );

    res.status(200).json({
      message: "Product Updated",
      data: updateProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = updateCartProductQuantity;
