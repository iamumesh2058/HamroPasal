import React from 'react';
import "./Cart.scss";
import { useSelector } from 'react-redux';
import { Button, CartItems } from '../../components';

const Cart = () => {
    const { cartItems } = useSelector(state => state.cart);
    return (
        <div className="cart-container">
            <div className="cart-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((cartItem, i) => {
                    return(
                        <CartItems key={i} cartItem={cartItem} />
                    )
                })
            }
            <div className="total">${}</div>

            <Button>Go to Checkout</Button>
        </div>
    )
}

export default Cart