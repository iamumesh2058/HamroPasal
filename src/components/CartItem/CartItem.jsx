import React from 'react';
import './CartItem.Style.jsx';
import { CartItemContainer, Image, ItemDetails, Name } from './CartItem.Style.jsx';

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <CartItemContainer>
            <Image src={imageUrl} alt={name} />
            <ItemDetails>
                <Name>{name}</Name>
                <span>{quantity} * ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem