import styled from 'styled-components';

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

export const Title = styled.h2`
  font-size: 28px;
  margin: 25px 0;
  cursor: pointer;
`

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(276px, 1fr));
  column-gap: 20px;
  row-gap: 50px;
`
  