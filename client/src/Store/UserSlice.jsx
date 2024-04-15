import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
};

export const getCurrentUser = createAsyncThunk("user/current-user", () => {
    return fetch(`/api/user/current-user`)
        .then(res => res.json())
        .catch((err) => console.log(err));
})

export const logoutUser = createAsyncThunk("user/logout", () => {
    return fetch(`/api/auth/logout`)
        .then(res => res.json())
        .catch((err) => console.log(err))
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.currentUser = null;
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            if(action.payload.err !== "Authentication invalid"){
                state.currentUser = action.payload;
            }
            else{
                state.currentUser = null;
            }

        })
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.currentUser = null
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.currentUser = null;
        })
    }
});


export default userSlice.reducer;
export const { setUser } = userSlice.actions;