import React, { useState } from 'react';
import './CartIcon.scss';
import shoppingBag from "../../assets/shopping-bag.svg";

import { useSelector, useDispatch } from "react-redux";
import { toggle as toggleCartDropdown } from '../../Store/CartDropdownSlice';

const CartIcon = () => {
    const dispatch = useDispatch();
    const {isCartOpen} = useSelector((state) => state.cartDropdown);
    return (
        <div className='cart-icon-container' onClick={() => {dispatch(toggleCartDropdown(!isCartOpen))}}>
            <img src={shoppingBag} alt="shopping bag" className='shopping-icon' />
            <span className='item-count'>0</span>
        </div>
    );
}

export default CartIcon;