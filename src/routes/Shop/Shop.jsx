import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Shop.scss';
import CategoiresPreview from '../CategoriesPreview/CategoriesPreview';
import Category from '../Category/Category';

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoiresPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop