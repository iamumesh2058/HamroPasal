import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./CategorySlice";
import productReducer from "./ProductSlice";
import userReducer from "./UserSlice";
import cartReducer from "./CartSlice";


const store = configureStore({
    reducer: {
        category: categoryReducer,
        products: productReducer,
        user: userReducer,
        cart: cartReducer
    }
})

export default store;