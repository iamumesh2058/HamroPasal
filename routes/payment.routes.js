const express = require("express");
const { sendStripeKey, processPayment } = require("../controllers/payment.controller");
const router = express.Router();

router.get("/getstripekey", sendStripeKey);
router.post("/processpayment", processPayment);

module.exports = router;