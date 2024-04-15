import { configureStore } from "@reduxjs/toolkit";
import cartDropdownReducer from "./CartDropdownSlice";
import userReducer from "./UserSlice";
import categoryReducer from "./CategorySlice";
import productReducer from "./ProductsSlics";
import cartReducer from "./CartSlice";

const store = configureStore({
    reducer: {
        cartDropdown: cartDropdownReducer,
        user: userReducer,
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer
    }
});

export default store;