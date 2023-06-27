import React from 'react';






const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', ' Закрытые'];


const  CategoriesComponent:React.FC<CategoriesProps> = React.memo(({ categoryValue, onChangeCategory}) => {

  



  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={categoryValue == index ? 'active' : ''}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
})

export default CategoriesComponent;
