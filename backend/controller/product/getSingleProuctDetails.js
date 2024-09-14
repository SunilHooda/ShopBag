const productModel = require("../../models/productModel");

const getSingleProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);

    res.status(200).json({
      message: "Single Product detail",
      data: product,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getSingleProductDetails;
