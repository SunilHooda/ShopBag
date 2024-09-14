const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
  try {
    const activeUser = await userModel.findById(req.userId);
    res.status(200).json({
      data: activeUser,
      error: false,
      success: true,
      message: "Active User Details",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
