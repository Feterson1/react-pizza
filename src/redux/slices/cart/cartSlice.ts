import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartSliceState } from "../../../common/types/store/cart/CartSliceType";
import { RootState } from "../../store";
import { CartItem } from "../../../common/types/cart/cartType";
import { getCartFromLS } from "../../../utils/getCartFromLS";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";


const {totalPrice,items} = getCartFromLS();

const initialState: CartSliceState = { 
   totalPrice,
     items,
};



const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addItem(state,action: PayloadAction<CartItem>){
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            if(findItem){
                findItem.count++;
            }else{
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = calcTotalPrice(state.items);
           
        },
        minusItem(state,action: PayloadAction<string>){
        const findItem = state.items.find((obj) => obj.id === action.payload);
        
        if(findItem){
            
            findItem.count--;
            // state.totalPrice = (state.totalPrice - findItem.price);
            state.totalPrice = calcTotalPrice(state.items);
            
        }
        
      

        },
        removeItem(state,action){
         state.items = state.items.filter((obj) => obj.id !== action.payload);
         state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems(state){
            state.items = [];
            state.totalPrice = 0;
        }

    }
});


export const selectCart = (state:RootState) => state.cart;
export const selectCartItemById = (id:string) => (state:RootState) => state.cart.items.find((obj)=> obj.id === id)

export const {addItem,removeItem,minusItem,clearItems} = cartSlice.actions;


export default cartSlice.reducer;