import React from 'react';
import './CategoryPreview.scss';
import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';

const CategoryPreview = ({ title, products }) => {
    return (
        <div className='category-preview-container'>
            <h2 className='title'>
                <span>
                    <Link to={`/shop/${title}`}>{title.toUpperCase()}</Link>
                </span>
            </h2>
            <div className="preview">
                {
                    products.filter((_, idx) => idx < 4)
                        .map((product) => {
                            return (
                                <ProductCard key={product.id} product={product} />
                            )
                        })
                }
            </div>
        </div>
    )
}

export default CategoryPreview