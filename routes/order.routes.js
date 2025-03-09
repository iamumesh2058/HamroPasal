const express = require("express");
const router = express.Router();

const {
    placeOrder,
    getAllOrders
} = require("../controllers/order.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");

router.post("/placeOrder", authenticateUser, placeOrder);
router.get("/getAllOrders", getAllOrders);


module.exports = router;