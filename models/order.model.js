const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    orderIitems: [{
        type: ObjectId,
        ref: "OrderItems",
        required: true
    }],
    total: {
        type: Number,
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    contactPerson: {
        type: String
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'shipping', 'delivered'],
        default: 'pending'
    },
    paymentInfo: {
        type: String
    }
}, { timestamps: true });


module.exports = mongoose.model("Order", orderSchema);