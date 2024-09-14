const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helper/permission");

async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const productToUpload = new productModel(req.body);

    const savedProduct = await productToUpload.save();

    res.status(201).json({
      message: "Product Uploaded Successfully",
      error: false,
      success: true,
      data: savedProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductController;
