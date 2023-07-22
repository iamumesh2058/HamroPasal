import React from 'react';
import { BackgroundImage, Body, DirectoryContainer, H2, P } from './DirectoryItem.Style';

const DirectoryItem = ({ category }) => {
    const { title, imageUrl } = category;

    return (
        <DirectoryContainer>
            <BackgroundImage style={{
                backgroundImage: `url(${imageUrl})`
            }} />
            <Body>
                <H2>{title}</H2>
                <P>Shop now</P>
            </Body>
        </DirectoryContainer>
    )
}

export default DirectoryItem