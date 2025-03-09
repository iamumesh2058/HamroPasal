const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderItemsModel = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("OrderItems", orderItemsModel);