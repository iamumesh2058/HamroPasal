import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')): {}
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            let productExist;
            if(state.cartItems){
                productExist = state.cartItems.find((cartItem) => cartItem.product._id === action.payload.product._id);
            }
            if (productExist) {
                state.cartItems.map((cartItem) => {
                    return cartItem.product._id === action.payload.product._id ? cartItem.quantity += 1 : cartItem;
                })
            }
            else {
                state.cartItems.push(action.payload);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter(cartItem => cartItem.product._id != action.payload.product._id);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        increaseCount: (state, action) => {
            state.cartItems.map((cartItem) => {
                return cartItem.product._id === action.payload.product._id ? cartItem.quantity += 1 : cartItem;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        decreaseCount: (state, action) => {
            state.cartItems.map((cartItem) => {
                return cartItem.product._id === action.payload.product._id ? cartItem.quantity -= 1 : cartItem;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
            localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo));
        }

    }
});

export default cartSlice.reducer;
export const { addItem, removeItem, increaseCount, decreaseCount, saveShippingInfo } = cartSlice.actions;