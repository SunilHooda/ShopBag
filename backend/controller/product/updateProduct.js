const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/productModel");

async function updateProductController(req, res) {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denied");
    }

    const { _id, ...payload } = req.body;

    const updateProduct = await productModel.findByIdAndUpdate(_id, payload);

    res.status(200).json({
      message: "Product Updated Successfully",
      data: updateProduct,
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
}

module.exports = updateProductController;
