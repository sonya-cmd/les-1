import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categoriess/category.reducer';
import { cartReducer } from './cart/cart.reducer'; // убедитесь, что он экспортируется корректно

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});