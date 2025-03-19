import React from 'react';
import "./CartDropdown.scss";
import CartDropdownItem from '../CartDropdownItem/CartDropdownItem';
import Button from '../Button/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    return (
        <div className='cart-dropdown-container'>
            <div className="cart-items">
                {
                    cartItems.length > 0 && cartItems.map((cartItem, i) => {
                        return <CartDropdownItem key={i} cartItem={cartItem} />
                    })
                }
            </div>
            <Button onClick={() => navigate("/cart")}>Go TO CART</Button>
        </div>
    )
}

export default CartDropdown;