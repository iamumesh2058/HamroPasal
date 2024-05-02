// place order
export const placeOrder = (order) => {
    return fetch(`/api/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}


// GET USER ORDERS
export const getUserOrders = (userid) => {
    return fetch(`api/order/getuseroders/${userid}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}


// get order details
export const getOrderDetials = (orderid) => {
    return fetch(`api/order/getorderdetails/${orderid}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

// get all orders
export const getAllOrders = () => {
    return fetch(`api/order/getallorders`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}