import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAlert } from "./alertSlice";

export const signup = createAsyncThunk(
    'auth/signup',
    async (userData, { dispatch }) => { 
        const config ={
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify(userData);
        
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/users/`, body, config);
    
            if (res.status === 201) {
                dispatch(
                    {
                    payload: res.data
                    }
                );
                dispatch(setAlert('Te enviamos un correo, por favor activa tu cuenta. Revisa el correo de spam','green'))
            } else {
                dispatch(setAlert('Error al crear cuenta', 'red'));
            }
        } catch (err) {
            dispatch(setAlert('Error conectando con el servidor, intenta mas tarde.', 'red'));
        }
    }
)

export const readProducts = createAsyncThunk(
    'counter/readProducts',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:1337/api/products?populate=thumbnail');
        const data = await response.json();
        return data.data;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  );