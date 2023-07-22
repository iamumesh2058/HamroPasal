import React, { useContext } from 'react';
import shoppingBag from '../../assets/shopping-bag.svg';
import { CartContext } from '../../context/CartContext';
import { CartIconContainer, ItemCount, ShoppingIcon } from './CartIcon.Style';

const CartIcon = () => {
    const { isCartOpen, setIcartOpen, itemCount } = useContext(CartContext);
    const toggleCartDropdown = () => {
        setIcartOpen(!isCartOpen);
    }
    return (
        <CartIconContainer onClick={toggleCartDropdown}>
            <ShoppingIcon src={shoppingBag} alt="shopping bag" />
            <ItemCount>{itemCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon