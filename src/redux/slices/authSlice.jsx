import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    loading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signup(state){
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            state.access =null,
            state.refresh=null,
            state.isAuthenticated = false;
            state.user = null;

        },
        logout(state) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            state.access =null,
            state.refresh=null,
            state.isAuthenticated = false;
            state.user = null;
        },
    },
  });


export const { setAlert, removeAlert } = authSlice.actions;

export default authSlice.reducer;