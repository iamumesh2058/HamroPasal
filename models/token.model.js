const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const tokenModel = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 84600
    }
});


module.exports = mongoose.model("Token", tokenModel);