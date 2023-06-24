import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchPizzas, getPizzaById } from "../../thunks/pizza/pizzaThunk";
import { RootState } from "../../store";
import { PizzaSliceState, Status } from "../../../common/types/store/pizza/PizzaSliceType";
import { PizzaSlice } from "../../../common/types/pizza/pizzaType";

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, // loading | success | error
    pizzaItem: {},
};


const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state,action:PayloadAction<PizzaSlice[]>){
            state.items = action.payload;


        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending,(state)=>{
            state.status = Status.LOADING;
            state.items = [];
        })
        builder.addCase(fetchPizzas.fulfilled,(state,action)=>{
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchPizzas.rejected,(state)=>{      
        state.status = Status.ERROR;
        state.items = [];
        })
        builder.addCase(getPizzaById.pending,(state)=>{
            state.status = Status.LOADING;
            state.pizzaItem = {};
        })
        builder.addCase(getPizzaById.fulfilled,(state,action)=>{
            state.pizzaItem = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(getPizzaById.rejected,(state)=>{
            state.status = Status.ERROR;
            state.pizzaItem = {};
        })

    }
    // extraReducers:{
    //    [fetchPizzas.fulfilled]: (state,action) => {
      
    //     state.items = action.payload;
    //     state.status = 'success';
        

    //    },
    //    [fetchPizzas.pending]: (state) => {
        
    //     state.status = 'loading';
    //     state.items = [];
        

    //    },
    //    [fetchPizzas.rejected]: (state) => {
        
    //     state.status = 'error';
    //     state.items = [];
        

    //    },
    //    [getPizzaById.fulfilled]: (state,action) => {
      
    //     state.pizzaItem = action.payload;
    //     state.status = 'success';
        

    //    },
    //    [getPizzaById.pending]: (state) => {
        
    //     state.status = 'loading';
    //     state.pizzaItem = {};
        

    //    },
    //    [getPizzaById.rejected]: (state) => {
        
    //     state.status = 'error';
    //     state.pizzaItem = {};
    //     console.log(state.status)
        

    //    },
       

    // },
});


export const selectPizzaData = (state:RootState) => state.pizza;


export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;