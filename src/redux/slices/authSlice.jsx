import { createSlice } from "@reduxjs/toolkit";
import { readSignup } from "../thunks/authThunk";

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: null,
  user: null,
  loading: false
}

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    signup(state) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readSignup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
  },
});

export const { signup } = authSlice.actions;

export default authSlice.reducer;