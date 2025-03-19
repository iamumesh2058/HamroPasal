import React from 'react';
import "./CartItems.scss";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { decreaseCount, increaseCount, removeItem } from '../../store/CartSlice';
import { toast } from 'react-toastify';

const CarteItems = ({ cartItem }) => {
    const dispatch = useDispatch();
    const { product, quantity } = cartItem;

    const handleDecrease = () => {
        if (quantity <= 1) {
            dispatch(removeItem(cartItem));
        }
        dispatch(decreaseCount(cartItem));
    }

    const handleIncrease = () => {
        if (quantity >= product.countInStock) {
            toast.error("Product out of stock");
            return;
        }
        dispatch(increaseCount(cartItem));
    }

    return (
        <div className='cart-item-container'>
            <div className="image-container">
                <Link to={`/product-details/${cartItem.product._id}`}>
                    <img src={product.image} alt={product.title} />
                </Link>
            </div>

            <span className="name">
                <Link to={`/product-details/${cartItem.product._id}`}>
                    {product.productName}
                </Link>
            </span>

            <div className="quantity">
                <span className="arrow" onClick={handleDecrease}>&lt;</span>
                <span className='value'>{quantity}</span>
                <span className='arrow' onClick={handleIncrease}>&gt;</span>
            </div>

            <span className="price">${product.price}</span>

            <div className="remove-button" onClick={() => dispatch(removeItem(cartItem))}>&#10005;</div>
        </div>
    )
}

export default CarteItems;