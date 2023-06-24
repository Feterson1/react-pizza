import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaSlice } from "../../../common/types/pizza/pizzaType";
import { PizzaItem } from "../../../common/types/store/pizza/PizzaSliceType";



export const fetchPizzas = createAsyncThunk<PizzaSlice[],Record<string, string>>('pizza/fetchPizzasStatus', 
async (params) => { 
    const {order,sortBy,category,search,currentPage} = params;

    const {data} = await axios.get<PizzaSlice[]>(`https://6411dc076e3ca31753000a5d.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`);
    console.log(data);
    return data;
});



export const getPizzaById = createAsyncThunk('pizza/getPizzaById', 
async (id:string) => { 
    

    const {data} = await axios.get(`https://6411dc076e3ca31753000a5d.mockapi.io/items/${id}`);
  console.log(data)
    return data as PizzaItem;
});