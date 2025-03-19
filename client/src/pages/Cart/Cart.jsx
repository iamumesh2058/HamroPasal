import React, { useEffect, useState } from 'react';
import "./Cart.scss";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, CartItems } from '../../components';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems } = useSelector(state => state.cart);
    const [totoal, setTtoal] = useState(0);

    useEffect(() => {
        if (cartItems.length > 0) {
            const totalCostArr = cartItems.map((cartItem) => cartItem.quantity * cartItem.product.price);
            const totalCost = totalCostArr.reduce((curr, acc = 0) => curr + acc);
            setTtoal(totalCost);
            sessionStorage.setItem('total', totalCost);
        }
    }, [cartItems]);

    return (
        <div>
            {
                cartItems && cartItems.length > 0 ?
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
                                return (
                                    <CartItems key={i} cartItem={cartItem} />
                                )
                            })
                        }

                        <div className="total">${totoal}</div>

                        <Button onClick={() => navigate('/checkout')}>Go to Checkout</Button>
                    </div>
                    :
                    <h4> No items</h4>
            }
        </div>
    )
}

export default Cart;