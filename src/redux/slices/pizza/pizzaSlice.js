import { createSlice } from "@reduxjs/toolkit";
import { fetchPizzas, getPizzaById } from "../../thunks/pizza/pizzaThunk";

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
    pizzaItem: {},
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
       [getPizzaById.fulfilled]: (state,action) => {
      
        state.pizzaItem = action.payload;
        state.status = 'success';
        

       },
       [getPizzaById.pending]: (state) => {
        
        state.status = 'loading';
        state.pizzaItem = {};
        

       },
       [getPizzaById.rejected]: (state) => {
        
        state.status = 'error';
        state.pizzaItem = {};
        console.log(state.status)
        

       },
       

    },
});


export const selectPizzaData = (state) => state.pizza;


export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;