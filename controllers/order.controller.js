const Order = require("../models/order.model");
const OrderItems = require("../models/category.model");

const { BadRequestError, NotFoundError } = require("../errors/custom.error");


// PLACE ORDER
exports.placeOrder = async (req, res) => {
    // validate orderItems exists in order
    if (!req.body.orderItems || !req.body.orderItems.length) {
        throw new BadRequestError("Order items are required");
    }

    // store order items in OrderItems model
    const orderItemsIds = await Promise.all(
        req.body.orderItems.map(async (orderItem) => {
            let newOrderItems = await OrderItems.create({
                product: orderItem.product,
                quantity: orderItem.quantity
            });

            if (!newOrderItems) throw new NotFoundError("No order items found");
            return newOrderItems._id;
        })
    );

    // calculate individuals totals
    const individual_total = await Promise.all(
        orderItemsIds.map(async (orderItem) => {
            const order_item = await OrderItems.findById(orderItem).populate('product', 'price');
            return order_item.product.price * order_item.quantity;
        })
    );

    // calculate total
    const total = individual_total.reduce((acc, cur) => acc + cur);

    req.body.orderItems = orderItemsIds;
    req.body.total = total;
    req.body.user = req.user.userId;

    const order = await Order.create(req.body);
    if (!order) throw new BadRequestError("Failed to place order!! Try again");

    res.status(201).json({ msg: "Order place successfully" });
}


// GET ALL ORDERS
exports.getAllOrders = async (req, res) => {
    const orders = await Order.find()
        .populate('user', 'username')
        .populate({ path: "orderItems", populate: ({ path: "product", poupulate: ("category") }) });

    if (!orders) throw new NotFoundError("No orders");
    res.status(200).json({ orders });
}