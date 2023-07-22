import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Arrow, CheckoutItemContainer, Image, ImageContainer, Name, Price, Quantity, RemoveButton, Value } from './CheckoutItem.Style';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity} = cartItem;
    const { increaseItemCount, decreaseItemCount, removeItemFromCart } = useContext(CartContext);

    const increaseCountHandler = () => increaseItemCount(cartItem);
    const decreaseItemCountHandler = () => decreaseItemCount(cartItem);
    const removeItemFromCartHanlder = () => removeItemFromCart(cartItem);
    
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <Image src={imageUrl} alt={name} />
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={decreaseItemCountHandler}>&lt;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={increaseCountHandler}>&gt;</Arrow>
            </Quantity>
            <Price>${price}</Price>
            <RemoveButton onClick={removeItemFromCartHanlder}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem