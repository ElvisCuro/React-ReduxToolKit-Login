import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import alertReducer from "./slices/alertSlice"
import authReducer from "./slices/authSlice"

const store = configureStore({
  reducer: {
    counter: counterReducer,
    alert: alertReducer,
    auth: authReducer,
  }
});

export default store