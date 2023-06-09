import React ,{useEffect,useContext,useState, useRef}from 'react';
import ReactPaginate from 'react-paginate';
import qs from 'qs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories/Categories';
import SortComponent, { popup_menu } from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';

const  HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const fetchPizzas = () => {
    setIsLoading(true);

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://6411dc076e3ca31753000a5d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
    
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
      const sort = popup_menu.find((obj) => obj.sortProperty == params.sortType)

      dispatch(setFilters({
        ...params,
        sort,
      }))

      isSearch.current = true;
      
    }

  },[])
  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {

    if(!isSearch.current){
      fetchPizzas();
    }

    isSearch.current = false;
 


    window.scrollTo(0, 0);

  }, [categoryId, sortType, searchValue, currentPage]);

  



  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryValue={categoryId} onChangeCategory={onChangeCategory} />
        <SortComponent />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default HomePage;