import React from 'react';

export default function Categories(props) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', ' Закрытые'];
  const onClickCategory = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={activeIndex == index ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
