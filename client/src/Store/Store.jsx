import { configureStore } from "@reduxjs/toolkit";
import cartDropdownReducer from "./CartDropdownSlice";
import userReducer from "./UserSlice";
import categoryReducer from "./CategorySlice";
import productReducer from "./ProductsSlics";

const store = configureStore({
    reducer: {
        cartDropdown: cartDropdownReducer,
        user: userReducer,
        category: categoryReducer,
        product: productReducer
    }
});

export default store;