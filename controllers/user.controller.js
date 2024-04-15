const User = require("../models/user.model");

exports.getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const newUser = delete user.password;
    const userWithoutPassword = user.toJSON();
    res.status(200).json({ user: userWithoutPassword });
}


exports.getAllUser = async (req, res) => {
    const users = await User.find();
    res.status(200).json({ users });
}