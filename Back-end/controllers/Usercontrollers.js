const User = require("../models/User.model");

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
    }

    const user = await User.create({ username, email, password });
    res.status(201).json(user);
};
