const express = require("express");
const router = express.Router();

const {
    processPayment,
    sendStripeKey
} = require("../controllers/payment.controller");

router.post("/processPayment", processPayment);
router.get("/getStripekey", sendStripeKey);

module.exports = router;