const mongoose = require("mongoose");


const categoryModel = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model("Category", categoryModel);