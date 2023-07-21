import React from 'react';
import './DirectoryItem.scss';

const DirectoryItem = ({ category }) => {
    const { title, imageUrl } = category;

    return (
        <div className='directory-container'>
            <div className="background-image" style={{
                backgroundImage: `url(${imageUrl})`
            }} />
            <div className="body">
                <h2>{title}</h2>
                <p>Shop now</p>
            </div>
        </div>
    )
}

export default DirectoryItem