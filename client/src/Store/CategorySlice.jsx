import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
}

export const getAllCategories = createAsyncThunk("category/getallcategory", () => {
    return fetch('/api/category')
        .then(response => response.json())
})

const categorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.categories = action.payload.categories
        })
    }
});

export default categorySlice.reducer;