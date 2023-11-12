import { createSlice } from "@reduxjs/toolkit";
import { 
  authSignup,
  authActivate,
  authLogin,
  authLoader,
  authCheck,
  authRefresh,
} from "../thunks/authThunk";

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
    signup: (state) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    activate: (state) => {
      state.loading = false;
    },
    login: (state, action) => {
      if (action.payload && action.payload.access && action.payload.refresh) {
        localStorage.setItem('access', action.payload.access);
        localStorage.setItem('refresh', action.payload.refresh);
    
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.isAuthenticated = true;
      }
    },
    loader: (state, action) => {
      state.loading = false;
      state.user=action.payload
    },
    check:(state)=>{
      state
    },
    refresh:(state,action )=>{
      state.access=action.payload
    },

  },
  extraReducers: (builder) => {
    builder.addCase(authSignup.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload 
    })

    builder.addCase(authActivate.fulfilled, (state) => {
      state.loading = false
    })

    builder.addCase(authLogin.fulfilled, (state) => {
      state.loading = false;
    })

    builder.addCase(authLoader.fulfilled, (state,action) => {
      state.loading = false;
      state.user = action.payload;

    })

    builder.addCase(authCheck.fulfilled, (state,action) => {
      state.isAuthenticated = true;
    })

    builder.addCase(authRefresh.fulfilled, (state,action) => {
      state.loading = false;
    })
  },
});

export const { signup, activate, login, loader } = authSlice.actions;

export default authSlice.reducer;
