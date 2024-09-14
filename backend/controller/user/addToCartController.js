const addToCartModel = require("../../models/cartProductModel");

const addToCartConroller = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;

    const isProductAvailabe = await addToCartModel.findOne({
      productId,
      userId: currentUser,
    });

    if (isProductAvailabe) {
      return res.json({
        message: "Already exist in Cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const productToAdd = new addToCartModel(payload);
    const saveProductToAdd = await productToAdd.save();

    return res.status(200).json({
      message: "Product added in Cart",
      success: true,
      error: false,
      data: saveProductToAdd,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartConroller;
