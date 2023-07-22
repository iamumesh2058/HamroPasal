import { styled} from "styled-components";

export const ButtonContainer = styled.div`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: black;

  background-color: ${(props)=>{
    if(props.variant == 'google'){
      return '#4285f4';
    } else if(props.variant == 'inverted'){
      return '#ffffff'
    } else{
      '#000000'
    }
  }};
  color: ${(props) => {
    if(props.variant == 'google'){
      return '#ffffff';
    } else if(props.variant == 'inverted'){
      return '#000000'
    } else{
      return '#ffffff'
    }
  }};

  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${(props) => {
    if(props.variant == 'google'){
      return '#357ae8';
    } else if(props.variant == 'inverted'){
      return '#000000'
    } else{
      return '#ffffff'
    }
  }};
    color: ${(props) => {
    if(props.variant == 'google'){
      return '#ffffff';
    } else if(props.variant == 'inverted'){
      return '#ffffff'
    } else{
      return '#000000'
    }
  }};
    border: ${(props) => {
    if(props.variant == 'google'){
      return 'none';
    } else if(props.variant == 'inverted'){
      return 'none'
    } else{
      return '1px solid black'
    }
  }};
  }
`
  

export const GoogleButton = styled(ButtonContainer)`
  background-color: #4285f4;
  color: white;
  
  &:hover{
    background-color: #357ae8;
    border: none;
  }
`

export const InvertedButton = styled(ButtonContainer)`
  background-color: white;
  color: black;
  
  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`