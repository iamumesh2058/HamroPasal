const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    image: String,
    imagePublicId: String,
}, {timestamps: true});


module.exports = mongoose.model("Category", categoryModel);