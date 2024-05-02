const express = require("express");
const router = express.Router();

const {
    placeOrder,
    getAllOrders,
    getOrderDetails
} = require("../controllers/order.controller");


router
    .route('/')
    .post(placeOrder)
    .get(getAllOrders)

router
    .route('/:orderId')
    .get(getOrderDetails)

module.exports = router;