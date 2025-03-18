import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    products: [],
    error: ''
}


export const getAllProducts = createAsyncThunk("product/getallproducts", () => {
    return fetch("api/product/getAllProducts")
        .then((res) => res.json());
});


const productSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.loading = true
        });

        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload.products
            state.error = ''
        });
        
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.error.message
        });
    }
});


export default productSlice.reducer;