import React, { useState } from "react";
import "./Menu.css";
import Logo from "../assets/TUKE_logo.png";
import { NavLink, useLocation } from "react-router-dom";
import NavigationPill from "./NavigationPill";
import SignInButton from "./SignInButton";

const Menu = () => {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    return (
        <div className="Menu">
            <div className="logo">
                <NavLink to="/"><img src={Logo} alt="logo" /></NavLink>
            </div>

            {/* Links section */}
            <div className={`links ${isDropdownOpen ? "show" : ""}`}>
                <NavLink to="/about-us">
                    <NavigationPill text="About us" active={location.pathname === '/about-us'} />
                </NavLink>
                <NavLink to="/contact">
                    <NavigationPill text="Contact" active={location.pathname === '/contact'} />
                </NavLink>
            </div>

            {/* Hamburger icon for small screens */}
            <div className="hamburger" onClick={toggleDropdown}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            {/* Dropdown menu for small screens */}
            <div className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
                <NavLink to="/about-us" onClick={toggleDropdown}>
                    About Us
                </NavLink>
                <NavLink to="/contact" onClick={toggleDropdown}>
                    Contact
                </NavLink>
                <NavLink to="/sign-in" onClick={toggleDropdown}>
                    Sign In
                </NavLink>
            </div>

            {/* Actions section */}
            <div className="actions">
                <NavLink to="/sign-in" state={{ from: location.pathname }}>
                    <SignInButton text="Sign in" />
                </NavLink>
            </div>
        </div>
    );
};

export default Menu;
