
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setAlert } from '../slices/alertSlice';
import { login } from '../slices/authSlice';

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


            if (res.status === 200) {
                dispatch(setAlert({
                    msg: 'Inicio de sesión con éxito',
                    alertType: 'green' 
                }));
                dispatch(login(res.data));
                dispatch(authLoader({ access: localStorage.getItem('access') }))
                return res.data
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
    async ({ rejectWithValue}) => {
        const access = window.localStorage.getItem('access');
        console.log(access)

        if (access) {
            const config = {
                headers: {
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };
            console.log(config);
    
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/auth/users/me/`,config);
                console.log(res)
                if (res.status === 200) {
                    return res.data;

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


export const authCheck = createAsyncThunk(
    'auth/authCheck', 
    async ({ rejectWithValue }) => {
        const access = window.localStorage.getItem('access');
        console.log(access)

        if (access) {
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify({
                token: localStorage.getItem('access')
            });

            console.log(body)

            try {
                const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/jwt/verify/`, body, config);

                if (res.status === 200) {
                    return res.data; // Puedes ajustar esto según tus necesidades
                } else {
                    throw new Error('La verificación del token no fue exitosa');
                }
            } catch (err) {
                // Manejar errores de la verificación
                return rejectWithValue(err.message);
            }
        } else {
            throw new Error('No hay token de acceso en el almacenamiento local');
        }
    }
);


export const authRefresh = createAsyncThunk(
    'auth/authRefresh',
    async ({ rejectWithValue }) => {
        const access = window.localStorage.getItem('access');
        console.log(access)

        if (access) {
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify({
                refresh: localStorage.getItem('refresh')
            });

            console.log(body)
            try {
                const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/jwt/refresh/`, body, config);

                if (res.status === 200) {
                    // Actualizar el token de acceso en el almacenamiento local
                    localStorage.setItem('access', res.data.access);
                    return res.data;
                } else {
                    // El refresh falló, manejar según sea necesario
                    throw new Error('La solicitud de refresh no fue exitosa');
                }
            } catch (err) {
                // Manejar errores de la solicitud de refresh
                return rejectWithValue(err.message);
            }
        } else {
            // No hay token de acceso en el almacenamiento local
            throw new Error('No hay token de acceso en el almacenamiento local');
        }
    }
);