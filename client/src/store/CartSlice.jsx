import { createSlice } from "@reduxjs/toolkit";
import { isAuthenticated } from "../api/user.api";
const currentUser = isAuthenticated();

const initialState = {
    isCartOpen: false,
    cartItems: localStorage.getItem(`cartItems-${currentUser.username}`) ? JSON.parse(localStorage.getItem(`cartItems-${currentUser.username}`)) : []
}



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleCartDropdown: (state, action) => {
            state.isCartOpen = !state.isCartOpen
        },
        addItem: (state, action) => {
            const productExist = state.cartItems.find((cartItem) => cartItem.product._id === action.payload.product._id);
            if (productExist) {
                state.cartItems.map((cartItem) => {
                    return cartItem.product._id === action.payload.product._id ? cartItem.quantity += 1 : cartItem;
                });
            } else {
                state.cartItems.push(action.payload);
            }
            localStorage.setItem(`cartItems-${currentUser.username}`, JSON.stringify(state.cartItems));
        },

        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.product._id != action.payload.product._id);
            localStorage.setItem(`cartItems-${currentUser.username}`, JSON.stringify(state.cartItems));
        },

        increaseCount: (state, action) => {
            state.cartItems.map((cartItem) => {
                return cartItem.product._id === action.payload.product._id ? cartItem.quantity += 1 : cartItem;
            });
            localStorage.setItem(`cartItems-${currentUser.username}`, JSON.stringify(state.cartItems));
        },

        decreaseCount: (state, action) => {
            state.cartItems.map((cartItem) => {
                return cartItem.product._id === action.payload.product._id ? cartItem.quantity += 1 : cartItem;
            });
            localStorage.setItem(`cartItems-${currentUser.username}`, JSON.stringify(state.cartItems));
        },
    }
});

export default cartSlice.reducer;
export const {
    toggleCartDropdown,
    addItem,
    removeItem,
    increaseCount,
    decreaseCount
} = cartSlice.actions;