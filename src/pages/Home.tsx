import React ,{useEffect,useRef}from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { selectFilter,setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/filterSlice';
import SortComponent, { popup_menu } from '../components/Sort/Sort';
import PizzaBlockComponent from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPizzas } from '../redux/thunks/pizza/pizzaThunk';
import { selectPizzaData } from '../redux/slices/pizza/pizzaSlice';
import CategoriesComponent from '../components/Categories/Categories';

const  HomePage: React.FC = ():JSX.Element => {



  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage,searchValue } = useSelector(selectFilter);
  const {items,status} = useSelector(selectPizzaData); 
  const sortType = sort.sortProperty;



 

  const onChangeCategory = (idx:number) => {
    dispatch(setCategoryId(idx));
  };
  const onChangePage = (page:number) => {
    dispatch(setCurrentPage(page));
  };
  const getPizzas = async () => {
    

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
  

    dispatch(
       //@ts-ignore
      
      fetchPizzas({
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
 
     
 
   },[categoryId,sortType,currentPage,searchValue]);

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

  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  



  const pizzas = items.map((obj:any) =><PizzaBlockComponent key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <CategoriesComponent categoryValue={categoryId} onChangeCategory={onChangeCategory} />
        <SortComponent />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' || items.length === 0 ? (
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