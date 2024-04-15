const Order = require("../models/order.model");
const OrderItems = require("../models/orderItems.model");
const { NotFoundError, BadRequestError } = require("../errors/custom.error");


// PLACE ORDER
exports.placeOrder = async (req, res) => {
    // store order items in OrderItems model
    const orderItemsIds = await Promise.all(
        req.body.orderItems.map(async (orderItem) => {
            let orderItems = await OrderItems.create({
                product: orderItem.product,
                quantity: orderItem.quantity
            });
            if (!orderItems) throw new NotFoundError("No order items found");
            return orderItems._id;
        })
    );

    // // calculate total
    // calculate individuals totals
    const individual_totals = await Promise.all(
        orderItemsIds.map(async (orderItem) => {
            let order_item = await OrderItems.findById(orderItem).populate('product', 'price');
            return order_item.product.price * order_item.quantity
        })
    );

    let total = individual_totals.reduce((acc, cur) => acc + cur);

    let order = await Order.create({
        orderItems: orderItemsIds,
        total: total,
        user: req.body.user,
        contactPerson: req.body.contactPerson,
        street: req.body.street,
        city: req.body.city,
        postalCode: req.body.postalCode,
        state: req.body.state,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber
    });


    if (!order) throw new BadRequestError("Failed to place order");

    res.status(200).json({ order });
}


// to get orders list
exports.getAllOrders = async (req, res) => {
    let orders = await Order.find().populate('user', 'username').populate({ path: 'orderItems', populate: ({ path: 'product', popultate: ('category') }) });
    if (!orders) throw new NotFoundError("No orders");
    res.status(200).json({ orders });
}


// to get order details
exports.getOrderDetails = async (req, res) => {
    let order = await Order.findById(req.params.orderId).populate('user', 'username').populate({ path: 'orderItems', populate: ({ path: 'product', populate: ('category') }) });
    if (!order) throw new NotFoundError("No orders");
    res.status(200).json({ order });
}


// get order of a particular user
exports.getUserOrders = async (req, res) => {
    let orders = await Order.find({ user: req.params.userId }).populate('user', 'username')
        .populate({ path: 'orderItems', populate: ({ path: 'product', populate: ('category') }) });
    if (!orders) {
        return res.status(400).json({ error: "Something went wrong" });
    }
    res.status(200).json({ orders });
}


// get order by status
exports.getOrdersByStatus = async (req, res) => {
    let orders = await Order.find({ status: req.query.status }).populate('user', 'username')
        .populate({ path: 'orderItems', populate: ({ path: 'product', populate: ('category') }) });
    if (!orders) {
        return res.status(400).json({ error: "Something went wrong" });
    }
    res.status(200).json({ orders });
}


// update order status
exports.updateOrderStatus = async (req, res) => {
    let order = await Order.findByIdAndUpdate(
        req.params.orderId,
        {
            status: req.body.status,
        },
        { new: true }
    );
    if (!order) {
        return res.status(400).json({ error: "Failed to update the order" });
    }
    res.send({ message: "Order updated successfully" });
}


// delete or cancel order
exports.deleteOrder = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId)
        .then(async order => {
            await Promise.all(
                order.order_items.map(item => {
                    OrderItems.findByIdAndDelete(item)
                        .then(orderItem => {
                            if (!orderItem) {
                                return res.status(400).json({ error: "Order item not found" });
                            }
                        })
                        .catch(error => {
                            return res.status(400).json({ error: error.message });
                        })
                })
            )
            res.send({ message: "Order deleted successfully." });
        })
        .catch(error => {
            return res.status(400).json({ error: error.message });
        })
}