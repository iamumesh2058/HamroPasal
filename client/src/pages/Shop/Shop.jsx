import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../store/ProductSlice';
import { ProductCard } from '../../components';
import "./Shop.scss";

const Shop = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    return (
        <div className='shop-container'>
            {
                products.loading && <h1>Loading...</h1>
            }
            {
                !products.loading && products.error ? <h3>Error...</h3> : null
            }
            {
                !products.loading && products.products?.map((product) => {
                    return (
                        <div key={product._id} className="product-container">
                            <ProductCard product={product} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Shop;