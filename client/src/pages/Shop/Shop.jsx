import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../Store/ProductsSlics';
import "./Shop.scss";
import { ProductContainer, ShopSideBar, ShopTopBar } from '../../components';

const Shop = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);
    return (
        <div className='shop-container'>
            {/* {
                products?.map((product) => {
                    return(
                        <div key={product._id}>
                            <h2>{product.title}</h2>
                        </div>
                    )
                })
            } */}
            <ShopSideBar />
            <div className="content">
                <ShopTopBar />
                <ProductContainer products={products} />
            </div>
        </div>
    )
}

export default Shop;