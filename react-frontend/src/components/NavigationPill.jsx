import React from 'react';
import './NavigationPill.css';

const NavigationPill = ({ text, active = false, onClick }) => {
    return (
        <button
            className={`navigation-pill ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default NavigationPill;
