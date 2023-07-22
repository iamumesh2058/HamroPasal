import React, { useContext } from 'react';
import Button from '../Button/Button';
import { CartContext } from '../../context/CartContext';
import CartItem from '../CartItem/CartItem';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, CartItems } from './CartDropdown.Style.jsx';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const naviage = useNavigate();
  return (
    <CartDropdownContainer>
        <CartItems>
            {
                cartItems.map((cartItem) => {
                    return (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    )
                })
            }
        </CartItems>
        
        <Button onClick={() => {naviage('/checkout')}}>Go TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown