import React ,{useEffect,useContext,useRef}from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/filterSlice';
import Categories from '../components/Categories/Categories';
import SortComponent, { popup_menu } from '../components/Sort/Sort';
import PizzaBlockComponent from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPizzas } from '../redux/thunks/pizza/pizzaThunk';

const  HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const {items,status} = useSelector((state) => state.pizza); 
  const sortType = sort.sortProperty;

  const { searchValue } = useContext(SearchContext);

 

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const getPizzas = async () => {
    

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({
      order,
      sortBy,
      category,
      search,
      currentPage,

    }));
  }

  // Если изменили параметры и был первый рендер
  useEffect(()=>{
    if(isMounted.current){
     const queryString = qs.stringify({
       sortType: sortType,
       categoryId,
       currentPage,
 
     });
 
     navigate(`?${queryString}`);
 
    }
    isMounted.current = true;
 
     
 
   },[categoryId,sortType,currentPage]);

   // Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(()=>{
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1));
      const sort = popup_menu.find((obj) => obj.sortProperty === params.sortType)

      dispatch(setFilters({
        ...params,
        sort,
      }))

      isSearch.current = true;
      
    }

  },[])
  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {

    
      getPizzas();
  

    isSearch.current = false;
 


    window.scrollTo(0, 0);

  }, []);

  



  const pizzas = items.map((obj) => <PizzaBlockComponent key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryValue={categoryId} onChangeCategory={onChangeCategory} />
        <SortComponent />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <>
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </>
      )}
      
    </div>
  );
}

export default HomePage;