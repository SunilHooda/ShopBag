const productModel = require("../../models/productModel");

const filterProduct = async (req, res) => {
  try {
    const categoryListArray = req.body.category || [];
    const sortBy = req.body.sortBy || "date"; // Default to sorting by date (newest first)

    // Determine the sorting condition based on the `sortBy` value
    let sortCondition = {};
    if (sortBy === "asc") {
      sortCondition = { sellingPrice: 1 }; // Sort by price ascending
    } else if (sortBy === "desc") {
      sortCondition = { sellingPrice: -1 }; // Sort by price descending
    } else if (sortBy === "date") {
      sortCondition = { createdAt: -1 }; // Sort by date, newest first
    }

    // Fetch products based on category filter and apply the sorting condition
    const products = await productModel
      .find({
        category: {
          $in: categoryListArray,
        },
      })
      .sort(sortCondition);

    res.status(200).json({
      data: products,
      message: "Filtered and Sorted Products",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "An error occurred while filtering products.",
      error: true,
      success: false,
    });
  }
};

module.exports = filterProduct;
