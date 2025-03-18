import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    categories: [],
    error: ""
}

export const getAllCategories = createAsyncThunk("category/getallcategories", () => {
    return fetch("/api/category/getAllCategories")
        .then(res => res.json());
});

const categorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.pending, (state, action) => {
            state.loading = true
        });

        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload.categories
            state.error = ""
        });

        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.loading = false
            state.categories = []
            state.error = action.error.message
        });
    }
});


export default categorySlice.reducer;