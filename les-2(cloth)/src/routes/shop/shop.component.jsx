import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { fetchCategoriesStart } from '../../store/categories/category.action'; // ✅

import './shop.styles.scss';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart()); // ✅ запускаем загрузку через saga
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;