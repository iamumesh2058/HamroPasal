import React, { useContext } from 'react';
import './CheckoutItem.scss';
import { CartContext } from '../../context/CartContext';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity} = cartItem;
    const { increaseItemCount, decreaseItemCount, removeItemFromCart } = useContext(CartContext);

    const increaseCountHandler = () => increaseItemCount(cartItem);
    const decreaseItemCountHandler = () => decreaseItemCount(cartItem);
    const removeItemFromCartHanlder = () => removeItemFromCart(cartItem);
    
    return (
        <div className='checkout-item-container'>
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <div className="quantity">
                <span className="arrow" onClick={decreaseItemCountHandler}>&lt;</span>
                <span className='value'>{quantity}</span>
                <span className='arrow' onClick={increaseCountHandler}>&gt;</span>
            </div>
            <span className="price">${price}</span>
            <div className="remove-button" onClick={removeItemFromCartHanlder}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem