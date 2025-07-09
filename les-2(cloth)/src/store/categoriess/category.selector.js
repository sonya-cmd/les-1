import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    Array.isArray(categories) // ✅ Проверка безопасности
      ? categories.reduce((acc, category) => {
          const { title, items } = category;
          acc[title.toLowerCase()] = items;
          return acc;
        }, {})
      : {} // Возвращаем пустой объект, если что-то пошло не так
)