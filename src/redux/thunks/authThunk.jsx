
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const readSignup = createAsyncThunk(
  
    'auth/readSignup', 
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

      try{
          const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/users/`, body,config);

            
          if (res.status === 201) {
            dispatch(
                {
                payload: res.data
                }
            );
            } else {
              throw new Error('La solicitud no fue exitosa');
            }    
        }catch (error){
          return rejectWithValue(error.message);
        }
}
)