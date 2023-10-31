import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  products: []
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    decrement: state => {
      state.value--;
    },
    increment: state => {
      state.value++;
    }
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;