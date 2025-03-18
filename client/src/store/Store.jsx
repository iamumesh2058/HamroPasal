import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./CategorySlice";
import productReducer from "./ProductSlice";

const store = configureStore({
    reducer: {
        category: categoryReducer,
        products: productReducer
    }
})

export default store;