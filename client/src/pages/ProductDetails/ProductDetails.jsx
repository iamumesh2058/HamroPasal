import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCategoryProducts, getProductDetails } from '../../api/product.api';
import { toast } from "react-toastify";
import "./ProductDetails.scss";
import { Button, ProductCard } from "../../components";
import { useDispatch } from 'react-redux';
import { addItem } from '../../Store/CartSlice';

const ProductDetails = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [recommendedProducts, setRecommendedProducts] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
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

		const getRecommendedProducts = async () => {
			getCategoryProducts(id)
				.then(data => {
					if (data.err) {
						toast.error(data.err);
					}
					else {
						setRecommendedProducts(data.products);
					}
				})
		}

		getDetails();
		getRecommendedProducts();
	}, [id]);

	const handleAddButton = () => {
		const productToAdd = {
			product: product,
			quantity: 1
		}
		dispatch(addItem(productToAdd));
		toast.success("Product added to cart successfully");
	}

	return (
		<>
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

					<Button onClick={() => handleAddButton(product)}>Add to Cart</Button>
				</div>
			</div>

			<div className="recomendation-container">
				<h3>Products you may like</h3>
				<div className="products-container">
					{
						recommendedProducts?.map((product) => {
							return (
								<ProductCard key={product._id} product={product} />
							)
						})
					}
				</div>
			</div>
		</>
	)
}

export default ProductDetails