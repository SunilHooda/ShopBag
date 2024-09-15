const productModel = require("../../models/productModel");

const getAllProductsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default to 1
    const limit = parseInt(req.query.limit) || 18; // Items per page, default to 18
    const skip = (page - 1) * limit; // Number of documents to skip

    // Extract sorting and filtering parameters
    const sortBy = req.query.sortBy || "date"; // Default sort by date
    const categories = req.query.category ? req.query.category.split(",") : []; // Get categories from query

    // Build the query object
    let query = {};

    if (categories.length > 0) {
      query.category = { $in: categories }; // Filter by category
    }

    // Define sort options based on sortBy parameter
    let sortOptions = {};
    switch (sortBy) {
      case "asc":
        sortOptions.sellingPrice = 1; // Price - Low to High
        break;
      case "dsc":
        sortOptions.sellingPrice = -1; // Price - High to Low
        break;
      case "date":
      default:
        sortOptions.createdAt = -1; // Date - Newest First
        break;
    }

    // Fetch the filtered and sorted products
    const allProducts = await productModel
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalProducts = await productModel.countDocuments(query); // Get total number of products based on query
    const totalPages = Math.ceil(totalProducts / limit); // Calculate total pages

    res.status(200).json({
      message: "All Products",
      success: true,
      error: false,
      data: allProducts,
      totalProducts,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getAllProductsController;
