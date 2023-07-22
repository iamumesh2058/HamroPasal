import React from 'react';
import DirectoryItem from '../DirectoryItem/DirectoryItem';
import { CategoriesContainer } from './CategoryContainer.Style.jsx';

const CategoryContainer = ({categories}) => {
  return (
    <CategoriesContainer>
      {
        categories.map((category) => {
          return (
            <DirectoryItem key={category.id} category={category} />
          )
        })
      }
    </CategoriesContainer>
  )
}

export default CategoryContainer