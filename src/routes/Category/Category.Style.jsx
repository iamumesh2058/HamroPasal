import styled from 'styled-components';

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    column-gap: 20px;
    row-gap: 50px;
`

export const CategroyTitle = styled.h2`
    font-size: 38px;
    margin: 10px auto 25px;
`