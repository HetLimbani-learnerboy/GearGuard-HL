const User = require("../models/Usermodel.js");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
};
