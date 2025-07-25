import { takeLatest, all, call, put } from "typed-redux-saga/macro";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { Category } from "./category.types"; // 👈 обязательно импортируй

// ✅ Сага: загрузка категорий
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray: Category[] = yield* call(getCategoriesAndDocuments); // 👈 добавлен тип
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

// ✅ Слушатель: реагирует на FETCH_CATEGORIES_START
export function* onFetchCategories() {
  yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

// ✅ Главная сага категорий
export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}