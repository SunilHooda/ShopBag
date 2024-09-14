const userModel = require("../../models/userModel");

async function updateUserRole(req, res) {
  try {
    const sessionAdmin = req.userId;
    const { userId, email, name, role } = req.body;

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const admin = await userModel.findById(sessionAdmin);

    const updatedUser = await userModel.findByIdAndUpdate(userId, payload);

    res.status(200).json({
      message: "User Updated",
      data: updatedUser,
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

module.exports = updateUserRole;
