import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filter/filterSlice';
import cartSlice from './slices/cart/cartSlice';

export const store = configureStore({
  reducer: {
    filter:filterSlice,
    cart: cartSlice,
  },
});
