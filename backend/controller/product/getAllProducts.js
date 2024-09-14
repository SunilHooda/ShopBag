const productModel = require("../../models/productModel");

const getAllProductsController = async (req, res) => {
  try {
    const allProducts = await productModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "All Products",
      success: true,
      error: false,
      data: allProducts,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: false,
      success: true,
    });
  }
};

module.exports = getAllProductsController;
