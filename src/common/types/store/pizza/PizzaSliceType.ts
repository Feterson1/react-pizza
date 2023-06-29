import { Sort } from "../filter/FilterSliceType";

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',

}
export type SearchPizzaParams = {
    order:string;
    sortBy:string ;
    category:string;
    search:string;
    currentPage:string;

}
export type PizzaItem = { 
    id:string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
}
export type FetchPizzasArgs ={ 

    order:string;
    sortBy:string;
    category:string;
    search:string;
    currentPage:string;

}

export interface PizzaSliceState {
    items: PizzaItem[];
    status: Status;
    pizzaItem: any;
}