import { createSlice } from '@reduxjs/toolkit'; 
import { showAlert } from '../thunks/alertThunk';

const initialState = {
  alert: null
};

const alertSlice = createSlice({
  name: 'Alert',
  initialState,
  reducers: {
    setAlert(state, action) {
      state.alert = action.payload;
    },
    removeAlert(state) {
      state.alert = null;
    },
  },

  extraReducers: builder => {
    builder.addCase(showAlert.pending, (state, action) => {
      // opcionalmente maneja estado pendiente
    });
    
    builder.addCase(showAlert.fulfilled, (state, action) => {
      state.alert = action.payload; 
    });
    
    builder.addCase(showAlert.rejected, (state, action) => {
      // opcionalmente maneja estado rechazado 
    });
  }
});

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;

