export type Pizza =  {
    order: string
    sortBy: string
    category: string
    search: string
    currentPage: number
}

export type PizzaSlice = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
  };
  


export type PizzaBlockProps = { 
    id: string,
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    
}