const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


module.exports = mongoose.model("User", userModel);