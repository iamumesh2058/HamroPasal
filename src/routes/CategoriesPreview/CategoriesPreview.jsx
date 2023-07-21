import React, { useContext } from 'react';

import { CategoriesContext } from '../../context/CategoriesContext';
import CategoryPreview from '../../components/CategoryPreview/CategoryPreview';

const CategoiresPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <>
      {
        Object.length > 0 &&
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          )
        })
      }
    </>
  )
}

export default CategoiresPreview