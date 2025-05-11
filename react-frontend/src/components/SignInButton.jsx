import React from "react";
import "./SignInButton.css";

const SignInButton = ({ onClick, text = "Sign in" }) => {
    return (
        <button className="sign-in-button" onClick={onClick}>
            {text}
        </button>
    );
};

export default SignInButton;
