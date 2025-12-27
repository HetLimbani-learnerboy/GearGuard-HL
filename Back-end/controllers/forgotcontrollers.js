const User = require("../models/Usermodel.js");
const bcrypt = require("bcrypt");

exports.checkEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }

  res.status(200).json({ message: "Email exists" });
};

exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updated = await User.findOneAndUpdate(
    { email },
    { password: hashedPassword }
  );

  if (!updated) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "Password updated successfully" });
};
