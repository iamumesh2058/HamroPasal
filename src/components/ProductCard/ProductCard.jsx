import React, { useContext } from 'react';
import './ProductCard.scss';
import Button from '../Button/Button';
import { CartContext } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;

    const {addItemToCart} = useContext(CartContext);

    const addItemToCartHanlder = () => addItemToCart(product);

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={name} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">${price}</span>
            </div>
            <Button buttonType={'inverted'} onClick={addItemToCartHanlder}>Add to Cart</Button>
        </div>
    )
}

export default ProductCard