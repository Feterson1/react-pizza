import Header from './components/Header/Header';
import Sort from './components/Sort/Sort';
import Categories from './components/Categories/Categories';
import './scss/app.scss';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import pizzas from '../src/assets/pizzas.json';
console.log(pizzas);

function App() {
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
              {pizzas.map((obj) => {
                return <PizzaBlock {...obj} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
