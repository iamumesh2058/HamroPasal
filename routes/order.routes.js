const express = require("express");
const router = express.Router();

const {
    placeOrder,
    getAllOrders,
    getOrderDetails,
    getUserOrders,
    getOrdersByStatus,
    updateOrderStatus,
    deleteOrder
} = require("../controllers/order.controller");
const { authenticateUser, authorizePermissions } = require("../middlewares/auth.middleware");

router.post("/placeOrder", authenticateUser, authorizePermissions('customer'), placeOrder);
router.get("/getAllOrders", authenticateUser, authorizePermissions('admin'), getAllOrders);
router.get("/getOrderDetails/:orderId", authenticateUser, getOrderDetails);
router.get("/getUserOrders", authenticateUser, authorizePermissions("customer"), getUserOrders);
router.get("/getOrderByStatus", authenticateUser, getOrdersByStatus);
router.put("/updateOrderStatus/:orderId", authenticateUser, updateOrderStatus);
router.delete("/deleteOrder/:orderId", authenticateUser, deleteOrder);


module.exports = router;