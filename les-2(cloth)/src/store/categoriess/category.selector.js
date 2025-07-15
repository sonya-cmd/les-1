import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selectCategoriesMap = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectIsCategoriesLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);