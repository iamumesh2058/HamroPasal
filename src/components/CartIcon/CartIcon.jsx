import React, { useContext } from 'react';
import './CartIcon.scss';
import shoppingBag from '../../assets/shopping-bag.svg';
import { CartContext } from '../../context/CartContext';

const CartIcon = () => {
    const { isCartOpen, setIcartOpen, itemCount } = useContext(CartContext);
    const toggleCartDropdown = () => {
        setIcartOpen(!isCartOpen);
    }
    return (
        <div className='cart-icon-container' onClick={toggleCartDropdown}>
            <img src={shoppingBag} alt="shopping bag" className='shopping-icon' />
            <span className="item-count">{itemCount}</span>
        </div>
    )
}

export default CartIcon