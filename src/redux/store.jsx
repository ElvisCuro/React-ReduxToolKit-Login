import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./slices/alertSlice"
import authReducer from "./slices/authSlice"

const store = configureStore({
  reducer: {
    Alert: alertReducer,
    Auth: authReducer,
  }
});

export default store