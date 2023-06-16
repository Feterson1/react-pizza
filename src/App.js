import React from 'react';

import HomePage from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/Cart';
import HeaderComponent from './components/Header/Header';



function App() {
  

  return (
    <div className="wrapper">
      
        <HeaderComponent />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
   
    </div>
  );
}

export default App;
