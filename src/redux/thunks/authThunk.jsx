
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setAlert } from '../slices/alertSlice';
import { loader } from '../slices/authSlice';

export const authSignup = createAsyncThunk(
  
    'auth/authSignup', 
    async ({ first_name, last_name, email, password, re_password }, { rejectWithValue, dispatch }) => {
  
      const config ={
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const body = JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        re_password
      });
    
      console.log(first_name, last_name, email, password, re_password);
      console.log(body); 

      try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/users/`, body, config);
        
        if (res.status === 201) {
            dispatch(setAlert({
                msg: 'Se enviodaa ',
                alertType: 'green' 
            }))
            return res.data
        } else {
            dispatch(setAlert({
                msg: 'Error al crear cuenta',
                alertType: 'red' 
            }))
        }    
    } catch (err) {
        console.log(err);
        dispatch(setAlert({
            msg: 'Error conectando con el servidor, intenta mas tarde.',
            alertType: 'red' 
        }));
        return rejectWithValue(err.message);
    }
}
)

export const authActivate = createAsyncThunk(
  
    'auth/authActivate', 
    async ({uid, token},{rejectWithValue,dispatch}) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token
    });

    console.log(uid,token);
    console.log(body);

    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/users/activation/`, body, config);
    
        if (res.status === 204) {
            dispatch(setAlert({
                msg: 'Cuenta activada correctamente',
                alertType: 'green' 
              }))
        } else {
            dispatch(setAlert({
                msg: 'Error activando cuenta',
                alertType: 'red' 
              }))
        }
    }
    catch(error){
        dispatch(setAlert({
            msg: 'Error al conectar con el servidor, intenta mas tarde.',
            alertType: 'red' 
          }))
        return rejectWithValue(error.message);
    }
});

export const authLogin = createAsyncThunk(
    'auth/authLogin', 
    async ({ email, password }, { rejectWithValue, dispatch }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            email,
            password
        });

        console.log(body)

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/jwt/create/`, body, config);
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);

            if (res.status === 200) {
                dispatch(setAlert({
                    msg: 'Inicio de sesión con éxito',
                    alertType: 'green' 
                }));
                dispatch({
                    payload: res.data
                });

                // Llamar a authLoader con el token de acceso como parámetro
                dispatch(authLoader({ 'access': res.data.access }));
                dispatch(authLoader({ access: res.data.access }));
                dispatch(loader());
            } else {
                dispatch(setAlert({
                    msg: 'Error al iniciar sesión.',
                    alertType: 'red' 
                }));
            }
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const authLoader = createAsyncThunk(
    'auth/authLoader', 
    async ({ access }, { rejectWithValue, dispatch }) => {
        if (access) {
            const config = {
                headers: {
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/auth/users/me/`,config);
                console.log(config)
            
                if (res.status === 200) {
                    dispatch({
                        payload: res.data,
                        
                    });
                    return {
                        payload: res.data 
                    };
                } else {
                    throw new Error('La solicitud no fue exitosa');
                }
            }
            catch (err) {
                return rejectWithValue(err.message);
            }
        } else {
            throw new Error('No hay token de acceso en el almacenamiento local');
        }
});