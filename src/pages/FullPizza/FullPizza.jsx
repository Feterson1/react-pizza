import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPizzaById } from "../../redux/thunks/pizza/pizzaThunk";
import { selectPizzaData } from "../../redux/slices/pizza/pizzaSlice";



const FullPizzaPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    

    const {pizzaItem,status} = useSelector(selectPizzaData);
    console.log(pizzaItem)

    const fetchPizzaById = () => {

        const pizzaId = id;

        dispatch(getPizzaById(pizzaId));
    }

    useEffect(()=>{
        fetchPizzaById();
        

    },[]);
    
    

    if(status === 'error'){
        return(
        <div className="content__error-info">
        <h2>Произошла ошибка 😕</h2>
        <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
      </div>)
    }

   
    return (
        
        <div className="container">
            <img src={pizzaItem.imageUrl}/>
            <h2>{pizzaItem.title}</h2>
            <h4>{pizzaItem.price}</h4>
        </div>
    )

}

export default FullPizzaPage;