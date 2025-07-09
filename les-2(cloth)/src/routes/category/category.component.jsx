import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";
import { selectCategoriesMap } from "../../store/categoriess/category.selector";

import './category.styles.scss';

const Category = () => {
  const { category } = useParams(); // например: hats
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Обновляем товары при изменении категории или карты категорий
    const matchedProducts = categoriesMap[category.toLowerCase()];
    if (matchedProducts) {
      setProducts(matchedProducts);
    }
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {
          products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <span className="loading-message">Загрузка...</span>
          )
        }
      </div>
    </Fragment>
  );
};

export default Category;