import React from 'react';
import Button from '../Button/Button';
import "./ProductCard.scss";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { title, image, price } = product;

    const navigate = useNavigate();
    return (
        <div className='product-card-container'>
            <img src={image} alt={title} />
            <div className="footer">
                <span className="name">{title}</span>
                <span className="price">Rs. {price}</span>
            </div>
            <Button buttonType={'inverted'} onClick={() => {navigate(`/product-details/${product._id}`)}}>View Details</Button>

        </div>
    )
}

export default ProductCard;