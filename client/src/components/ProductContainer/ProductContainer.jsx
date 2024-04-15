import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import "./ProductContainer.scss";

const ProductContainer = ({products}) => {
    return (
        <div className='product-container'>
            {
                products?.map((product) => {
                    return <ProductCard key={product._id} product={product} />
                })
            }
        </div>
    )
}

export default ProductContainer;