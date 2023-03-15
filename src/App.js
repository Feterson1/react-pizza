import Header from './components/Header/Header';
import Sort from './components/Sort/Sort';
import Categories from './components/Categories/Categories';
import './scss/app.scss';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';

function App() {
  return (
    <div className="App">
      <div class="wrapper">
        <Header />
        <div class="content">
          <div class="container">
            <div class="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 class="content__title">Все пиццы</h2>
            <div class="content__items">
              <PizzaBlock price={33333} title={'Аллаховская'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
