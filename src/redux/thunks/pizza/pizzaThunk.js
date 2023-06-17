import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', 
async (params,thunkAPI) => { 
    const {order,sortBy,category,search,currentPage} = params;

    const {data} = await axios.get(`https://6411dc076e3ca31753000a5d.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`);
  
    return data;
});



export const getPizzaById = createAsyncThunk('pizza/getPizzaById', 
async (id) => { 
    

    const {data} = await axios.get(`https://6411dc076e3ca31753000a5d.mockapi.io/items/${id}`);
  
    return data;
});