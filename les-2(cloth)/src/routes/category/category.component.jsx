import {  useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

import './category.styles.scss';
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categoriess/category.selector";

const Category = () => {
  const { category } = useParams();
  console.log('render/re-rendering category component');
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);


  useEffect(() => {
    console.log('effect fired calling setProducts');
    if (categoriesMap[category]) {
      setProducts(categoriesMap[category]);
    }
  }, [category, categoriesMap]);

  // 🔒 Защита от преждевременного рендера
  if (!categoriesMap[category]) {
    return <div>Загрузка...</div>;
  }

  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className='category-container'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Fragment>
  );
};

export default Category;