import React from 'react';
import "./CartDropdownItem.scss";

const CartDropdownItem = ({ cartItem }) => {
    const { product, quantity } = cartItem;
    return (
        <div className='cart-dropdown-item-container'>
            <img src={product.image} alt={product.title} />
            <div className="item-details">
                <span className="name">{product.title}</span>
                <span>{quantity} * ${product.price}</span>
            </div>
        </div>
    )
}

export default CartDropdownItem;