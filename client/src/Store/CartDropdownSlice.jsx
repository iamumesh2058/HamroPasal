import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCartOpen: false
};

const cartDropdownSlice = createSlice({
    name: "cartDropdown",
    initialState,
    reducers: {
        toggle: (state, action) => {
            state.isCartOpen = action.payload
        }
    }
});

export default cartDropdownSlice.reducer;
export const { toggle } = cartDropdownSlice.actions;