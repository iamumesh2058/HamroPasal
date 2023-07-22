import React from 'react';
import { ButtonContainer } from './Button.Style.jsx';

const Button = ({ children, buttonType, ...otherProps }) => {
    const button_type_classes = {
        google: 'google',
        inverted: 'inverted'
    }
    return (
        <ButtonContainer variant={`${buttonType ? button_type_classes[buttonType] : ''}`}  {...otherProps}>
            {children}
        </ButtonContainer>
    )
}

export default Button