type Pizza =  {
    order: string
    sortBy: string
    category: string
    search: string
    currentPage: number
}



type PizzaBlockProps = { 
    id: string,
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    
}