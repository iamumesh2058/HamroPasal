import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: null,
}

export const getAllProducts = createAsyncThunk("products/getallproducts", () => {
    return fetch("/api/product")
    .then((res) => res.json())
})

const productsSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload.products;
        })
    }
})

export default productsSlice.reducer;