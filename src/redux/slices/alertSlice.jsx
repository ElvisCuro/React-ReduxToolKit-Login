import { createSlice } from '@reduxjs/toolkit'; 

const initialState = {
  alert: null
};

const alertSlice = createSlice({
  name: 'Alert',
  initialState,
  reducers: {
    setAlert(state, action) {
      state.alert=action.payload
    },
    removeAlert(state) {
      state.alert = null;
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;

