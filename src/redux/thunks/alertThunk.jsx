import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAlert, removeAlert } from '../slices/alertSlice';

export const showAlert = createAsyncThunk(
  'alert/show',
  async (alert, { dispatch }) => {
    dispatch(setAlert(alert));
    
    await new Promise(resolve =>  
      setTimeout(resolve, 5000)
    );
    
    dispatch(removeAlert());
  }
);