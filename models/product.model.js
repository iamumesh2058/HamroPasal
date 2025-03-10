const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productModel = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: String,
    imagePublicId: String,
    category: {
        type: ObjectId,
        ref: "Category"
    },
    countInStock: {
        type: Number,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model("Product", productModel);