import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../context/CartContext'
import './Checkout.scss';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';

const Checkout = () => {
    const { setIcartOpen, cartItems, totalCost } = useContext(CartContext);
    useEffect(() => {
        document.title = 'Hamro Pasal | Checkout',
            setIcartOpen(false);
    }, []);
    return (
        <div className='checkout-container'>
            <div className="checkout-header">
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
                cartItems.map((cartItem) => {
                    return (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    )
                })
            }
            <div className="total">Total : ${totalCost}</div>
        </div>
    )
}

export default Checkout