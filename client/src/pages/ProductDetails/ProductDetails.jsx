import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryProducts, productDetails } from '../../api/product.api';
import { toast } from 'react-toastify';
import "./ProductDetails.scss";
import { Button, ProductCard } from '../../components';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/CartSlice';
import { isAuthenticated } from '../../api/user.api';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState(null);
    const currentUser = isAuthenticated();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getProductDetails = async () => {
        await productDetails(id)
            .then((data) => {
                if (data.err) {
                    toast.error(data.err);
                } else {
                    setProduct(data.product)
                }
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    const getRecommendedProducts = async () => {
        await getCategoryProducts(id)
            .then((data) => {
                if (data.err) {
                    toast.error(data.err);
                }
                else {
                    setRecommendedProducts(data.products);
                }
            });
    }

    useEffect(() => {
        getProductDetails();
        getRecommendedProducts();
    }, [id]);


    const handleAddButton = () => {
        if (!currentUser) {
            toast.error("Login to add");
            return navigate("/sign-in");
        } else if (currentUser.role === "admin") {
            toast.error("You are admin");
            return false;
        } else {
            const productToAdd = {
                product: product,
                quantity: 1
            }
            dispatch(addItem(productToAdd));
            toast.success("Product added to cart successfully");
        }
    }

    return (
        <>
            <div className='product-detail-container'>
                <div className="image">
                    <img src={product?.image} alt={product?.productName} />
                </div>

                <div className="content">
                    <h3>Product Details</h3>
                    <p>Product Name: {product?.productName}</p>
                    <p>Price : Rs. {product?.price}</p>
                    <p>Description : {product?.description}</p>
                    <p>Count In Stock : {product?.countInStock}</p>
                    <p>Category : {product?.category?.categoryName}</p>

                    <Button onClick={handleAddButton}>Add to Card</Button>
                </div>
            </div>

            <div className="recomendation-container">
                <h3>Products you may like</h3>
                <div className="products-container">
                    {
                        recommendedProducts?.map((product) => {
                            return (
                                product._id !== id ?
                                    <ProductCard key={product._id} product={product} />
                                    :
                                    null
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ProductDetails;