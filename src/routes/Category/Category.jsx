import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../context/CategoriesContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import { CategoryContainer, CategroyTitle } from './Category.Style';

const Category = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    const { category } = useParams();
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    console.log(products);
    return (
        <>
            <CategroyTitle>{category.toUpperCase()}</CategroyTitle>
            <CategoryContainer>
                {
                    products &&
                    products.map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        )
                    })
                }
            </CategoryContainer>
        </>
    )
}

export default Category