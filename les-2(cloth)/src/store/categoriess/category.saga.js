import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

// Сага: загрузка категорий
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

// Слушатель: реагирует на FETCH_CATEGORIES_START
export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

// Главная сага категорий
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}