import React from 'react';

import HomePage from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/Cart';
import HeaderComponent from './components/Header/Header';
import FullPizzaPage from './pages/FullPizza/FullPizza';
import MainLayout from './layouts/MainLayout/mainLayout';



function App() {
  

  return (

      
 
        <Routes>
          <Route to={'/'} element={<MainLayout/>}>
          
            <Route path="" element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="pizza/:id" element={<FullPizzaPage />} />
            <Route path="*" element={<NotFound />} />
         
          </Route>
          </Routes>
  
   
    
  );
}

export default App;
