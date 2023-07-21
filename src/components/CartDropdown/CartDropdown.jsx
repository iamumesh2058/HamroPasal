import React, { useContext } from 'react';
import Button from '../Button/Button';
import './CartDropdown.scss'
import { CartContext } from '../../context/CartContext';
import CartItem from '../CartItem/CartItem';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const naviage = useNavigate();
  return (
    <div className='cart-dropdown-container'>
        <div className="cart-items">
            {
                cartItems.map((cartItem) => {
                    return (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    )
                })
            }
        </div>
        
        <Button onClick={() => {naviage('/checkout')}}>Go TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown