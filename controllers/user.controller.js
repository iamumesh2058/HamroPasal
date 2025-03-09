const User = require("../models/user.model");


// get all users 
exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json({ users });
}


// 