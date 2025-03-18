import React from 'react';
import "./ProductCard.scss";
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { productName, image, price } = product;

    return (
        <div className='product-card-container'>
            <img src={image} alt={productName} />
            <div className="footer">
                <div className="name">{productName}</div>
                <div className="price">Rs. {price}</div>
            </div>
            <Button
                buttonType={'inverted'}
                onClick = {() => {navigate(`/product-details/${product._id}`)}}
            >
                View Details
            </Button>
        </div>
    )
}

export default ProductCard;