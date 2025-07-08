import { useSelector } from "react-redux";
import { Fragment } from "react";

import { selectCategoriesMap } from "../../store/categoriess/category.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  // 🔒 Защита от пустых данных
  if (!categoriesMap || Object.keys(categoriesMap).length === 0) {
    return <div>Загрузка...</div>;
  }

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;