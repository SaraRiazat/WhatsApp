import React from "react";
import '../styles/_styles.scss';

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
    <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-btn `} {...otherProps}>
        {children}
    </button>
)

export default CustomButton