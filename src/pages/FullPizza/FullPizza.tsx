import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getPizzaById } from "../../redux/thunks/pizza/pizzaThunk";
import { useAppDispatch } from "../../utils/hook";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectPizzaData } from "../../redux/slices/pizza/pizzaSlice";



const FullPizzaPage: React.FC = () => {

    // const [pizzaItem,setPizza] = useState<{
    //     imageUrl: string;
    //     title: string;
    //     price: number;

    // }>();

    const {id} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    

    const {pizzaItem,status} = useSelector(selectPizzaData);
    
    const fetchPizzaById = () => {

        const pizzaId = String(id);

        dispatch(getPizzaById(pizzaId));
    }

   
    useEffect(()=>{

        // const fetchPizzaById = async () => {
        //     try{
        //         const {data} = await axios.get(`https://6411dc076e3ca31753000a5d.mockapi.io/items/${id}`);
        //         console.log(data)
        //         setPizza(data);

        //     }catch(e){
        //         alert('Пиццц нет');
        //         navigate('/');

        //     }
        
        // }
    

        fetchPizzaById()
        

    },[]);
    
    if(status === 'error'){
        return(
        <div className="content__error-info">
        <h2>Произошла ошибка 😕</h2>
        <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
      </div>)
    }

    // if(!pizzaItem){
    //     return(
    //     <div className="content__error-info">
    //     <h2>Произошла ошибка 😕</h2>
    //     <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
    //   </div>)
    // }

   
    return (
        
        <div className="container">
            <img src={pizzaItem.imageUrl}/>
            <h2>{pizzaItem.title}</h2>
            <h4>{pizzaItem.price}</h4>
        </div>
    )

}

export default FullPizzaPage;