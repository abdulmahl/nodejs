const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On client, also delete accessToken...

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content...
  const refreshToken = cookies.jwt;

  // Is ref
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); //* No content
  }

  // Delete token from db...
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result)
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204); // No content...
};

module.exports = { handleLogout };
