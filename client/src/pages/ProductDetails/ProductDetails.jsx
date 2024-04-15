import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../api/product.api';
import { toast } from "react-toastify";
import "./ProductDetails.scss";
import { Button } from "../../components";

const ProductDetails = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const getDetails = async () => {
		getProductDetails(id)
			.then(data => {
				if (data.err) {
					toast.error(data.err);
				}
				else {
					setProduct(data.product);
				}
			})
	}

	useEffect(() => {
		getDetails();
	}, [id]);

	console.log(product);
	return (
		<div className='product-detail-container'>
			<div className="image">
				<img src={product?.image} alt={product?.title} />
			</div>
			<div className="content">
				<h3>Product Details</h3>
				<p>Product Name: {product?.title}</p>
				<p>Price : Rs. {product?.price}</p>
				<p>Description : {product?.description}</p>
				<p>Count In Stock : {product?.countInStock}</p>
				<p>Category : {product?.category?.categoryName}</p>
				<p>Rating : {product?.rating}</p>
				
				<Button>Add to Cart</Button>
			</div>	
		</div>
	)
}

export default ProductDetails