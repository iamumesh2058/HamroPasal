import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIcartOpen: () => {},
    cartItems : [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    increaseItemCount: () => {},
    decreaseItemCount: () => {},
    itemCount: 0,
    totalCost: 0,
});

const addCartItem = (cartItems, productToAdd) => {
    const itemAlreadyExist = cartItems.find((cartItem) => cartItem.id == productToAdd.id);
    if(itemAlreadyExist){
        return (
            cartItems.map((cartItem) => cartItem.id == productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem)
        )
    }
    return [...cartItems, {...productToAdd, quantity : 1}];
}


const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id != productToRemove.id);
}


const increaseCount = (cartItems, productToIncrease) => {
    return cartItems.map((cartItem) => cartItem.id == productToIncrease.id ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem)
}


const decreaseCount = (cartItems, prodcutTodecrease) => {
    const itemAlreadyExist = cartItems.find((cartItem) => cartItem.id == prodcutTodecrease.id);
    if(itemAlreadyExist.quantity == 1){
        return (
            cartItems.filter((cartItem) => cartItem.id != prodcutTodecrease.id)
        )
    }
    return (
        cartItems.map((cartItem) => cartItem.id == prodcutTodecrease.id ? { ...cartItem, quantity: cartItem.quantity - 1} : cartItem)
    )
}


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIcartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [itemCount, setItemCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        const totalItemCount = cartItems.reduce((totalcount, item) => totalcount + item.quantity, 0);
        setItemCount(totalItemCount);
        const totalItemCost = cartItems.reduce((cost, item) => cost + item.quantity * item.price, 0);
        setTotalCost(totalItemCost);
    }, [cartItems]);


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }


    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }


    const increaseItemCount = (productToIncrease) => {
        setCartItems(increaseCount(cartItems, productToIncrease));
    }


    const decreaseItemCount = (prodcutTodecrease) => {
        setCartItems(decreaseCount(cartItems, prodcutTodecrease));
    }


    const value = { isCartOpen, setIcartOpen, cartItems, addItemToCart, removeItemFromCart, increaseItemCount, decreaseItemCount, itemCount, totalCost };
    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}