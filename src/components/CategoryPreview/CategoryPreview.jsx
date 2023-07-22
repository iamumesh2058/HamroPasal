import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import { CategoryPreviewContainer, Preview, Title } from './CategoryPreview.Style';

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <Title>
                <span>
                    <Link to={`/shop/${title}`}>{title.toUpperCase()}</Link>
                </span>
            </Title>
            <Preview>
                {
                    products.filter((_, idx) => idx < 4)
                        .map((product) => {
                            return (
                                <ProductCard key={product.id} product={product} />
                            )
                        })
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview