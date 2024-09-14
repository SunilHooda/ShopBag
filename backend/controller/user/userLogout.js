async function userLogout(req, res) {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("token", tokenOption);

    res.status(200).json({
      data: {},
      message: "Logged Out Successfully",
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
}

module.exports = userLogout;
