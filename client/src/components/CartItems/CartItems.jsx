import React from 'react';
import "./CartItems.scss";
import { useDispatch } from 'react-redux';
import { decreaseCount, increaseCount, removeItem } from '../../Store/CartSlice';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const CartItems = ({ cartItem }) => {
	const disptach = useDispatch();
	const { product, quantity } = cartItem;

	const handleIncrease = () => {
		if (quantity >= product.countInStock) {
			toast.error("Out of stock");
			return;
		}
		disptach(increaseCount(cartItem));
	}

	const handleDecrease = () => {
		if (quantity <= 1) {
			disptach(removeItem(cartItem));
		}
		disptach(decreaseCount(cartItem))
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
					{product.title}
				</Link>
			</span>

			<div className="quantity">
				<span className="arrow" onClick={handleDecrease}>&lt;</span>
				<span className='value'>{quantity}</span>
				<span className='arrow' onClick={handleIncrease}>&gt;</span>
			</div>

			<span className="price">${product.price}</span>
			
			<div className="remove-button" onClick={() => disptach(removeItem(cartItem))}>&#10005;</div>
		</div>
	)
}

export default CartItems