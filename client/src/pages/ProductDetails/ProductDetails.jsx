import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productDetails } from '../../api/product.api';
import { toast } from 'react-toastify';
import "./ProductDetails.scss";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const getProductDetails = async () => {
        productDetails(id)
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

    useEffect(() => {
        getProductDetails();
    }, [id]);

    return (
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
            </div>

        </div>
    )
}

export default ProductDetails;