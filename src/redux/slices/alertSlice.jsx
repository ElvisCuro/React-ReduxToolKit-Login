import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alert: null
};


export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert(state,action){
        const { msg, alertType, timeout = 5000 } = action.payload;
        state.alert = { msg, alertType };
  
        if (timeout) {
          setTimeout(() => {
            state.alert = null;
          }, timeout);
        }
    }
  },
});


export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;