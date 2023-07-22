import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { ProductCardContainer, Footer, Image, ProductButton, Name, Price } from './ProductCard.Style.jsx';

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;

    const {addItemToCart} = useContext(CartContext);

    const addItemToCartHanlder = () => addItemToCart(product);

    return (
        <ProductCardContainer>
            <Image src={imageUrl} alt={name} />
            <Footer>
                <Name>{name}</Name>
                <Price>${price}</Price>
            </Footer>
            <ProductButton buttonType={'inverted'} onClick={addItemToCartHanlder}>Add to Cart</ProductButton>
        </ProductCardContainer>
    )
}

export default ProductCard