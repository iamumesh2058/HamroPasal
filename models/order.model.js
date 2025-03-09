const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderModel = new mongoose.Schema({
    orderItems: [{
        type: ObjectId,
        ref: 'OrderItems',
        required: true
    }],
    total: Number,
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    contactPerson: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'shipping', 'delivered', 'canceled'],
        default: 'pending'
    },
    paymentInfo: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderModel);