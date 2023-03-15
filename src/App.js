import React from 'react';
import Header from './components/Header/Header';
import Sort from './components/Sort/Sort';
import Categories from './components/Categories/Categories';
import './scss/app.scss';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import pizzas from '../src/assets/pizzas.json';

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://6411dc076e3ca31753000a5d.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {items.map((obj, index) => {
                return <PizzaBlock key={index} {...obj} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
