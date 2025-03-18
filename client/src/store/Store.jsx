import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./CategorySlice";
import allProductReducer from "./ProductSlice";

const store = configureStore({
    reducer: {
        category: categoryReducer,
        products: allProductReducer
    }
})

export default store;