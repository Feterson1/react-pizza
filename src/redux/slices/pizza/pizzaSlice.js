import { createSlice } from "@reduxjs/toolkit";
import { fetchPizzas } from "../../thunks/pizza/pizzaThunk";

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
};


const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state,action){
            state.items = action.payload;


        }
    },
    extraReducers:{
       [fetchPizzas.fulfilled]: (state,action) => {
      
        state.items = action.payload;
        state.status = 'success';

       },
       [fetchPizzas.pending]: (state) => {
        
        state.status = 'loading';
        state.items = [];

       },
       [fetchPizzas.rejected]: (state) => {
        state.status = 'error';
        state.items = [];

       },

    },
});


export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;