import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload.user;
        }
    }
});


export default userSlice.reducer;
export const { setUser } = userSlice.actions;