import React from "react";
import "./Button.scss";

const Button = ({ children, buttonType, ...otherProps }) => {
    const button_type_classes = {
        inverted: 'inverted'
    }
    return (
        <button className={`button-container ${button_type_classes[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button;