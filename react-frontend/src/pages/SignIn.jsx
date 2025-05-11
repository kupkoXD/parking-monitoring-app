import './SignIn.css';
import React, { useState } from "react";
import Logo from "../assets/TUKE_logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, Input, Form } from "react-aria-components";

function SignIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = (event) => {
        event.preventDefault();
        // No validation for username or password anymore, proceed to the next page
        navigate(location.state?.from || "/");
    };

    return (
        <div className="SignIn">
            <div className="logo-big">
                <img src={Logo} alt="logo"/>
            </div>
            <Form name="signInForm" onSubmit={handleSignIn}>
                <div className="sign-in-form">
                    <TextField label="Username" name="username">
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </TextField>
                    <TextField label="Password" name="password">
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </TextField>
                    <Button type="submit">Sign In</Button>
                </div>
            </Form>
        </div>
    );
}

export default SignIn;
