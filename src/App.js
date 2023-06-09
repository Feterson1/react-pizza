import React from 'react';
import Header from './components/Header/Header';
import HomePage from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';

export const SearchContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
