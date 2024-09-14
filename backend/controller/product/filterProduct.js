const productModel = require("../../models/productModel");

const filterProduct = async (req, res) => {
  try {
    const categoryListArray = req?.body?.category || [];
    const sortOrder = req?.body?.sortBy || "asc"; // Default to ascending order if no sort is provided

    const products = await productModel
      .find({
        category: {
          $in: categoryListArray,
        },
      })
      .sort({ sellingPrice: sortOrder === "asc" ? 1 : -1 }); // Sorting by price

    res.status(200).json({
      data: products,
      message: "Filter and Sorted Product",
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

module.exports = filterProduct;
