import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./CategorySlice";
import productReducer from "./ProductSlice";
import userReducer from "./UserSlice";


const store = configureStore({
    reducer: {
        category: categoryReducer,
        products: productReducer,
        user: userReducer
    }
})

export default store;