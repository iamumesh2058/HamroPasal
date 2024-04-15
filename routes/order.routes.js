const express = require("express");
const router = express.Router();

const {
    placeOrder
} = require("../controllers/order.controller");


router
    .route('/')
    .post(placeOrder)



module.exports = router;