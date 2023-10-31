import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import alertReducer from "./slices/alertSlice"

const store = configureStore({
  reducer: {
    counter: counterReducer,
    alert: alertReducer,
  }
});

export default store