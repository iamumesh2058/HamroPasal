import React from 'react';
import './CategoryContainer.scss';
import DirectoryItem from '../DirectoryItem/DirectoryItem';

const CategoryContainer = ({categories}) => {
  return (
    <div className='categories-container'>
      {
        categories.map((category) => {
          return (
            <DirectoryItem key={category.id} category={category} />
          )
        })
      }
    </div>
  )
}

export default CategoryContainer