import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filter/filterSlice';
import cartSlice from './slices/cart/cartSlice';
import pizzaSlice from './slices/pizza/pizzaSlice';

export const store = configureStore({
  reducer: {
    filter:filterSlice,
    cart: cartSlice,
    pizza: pizzaSlice,
  },
});


export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
