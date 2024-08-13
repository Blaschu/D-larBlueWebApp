import React from "react";
import { Link } from 'react-router-dom';
import '../styles/MainButton.css'

const MainButton = ({ label, to}) => {
    return (
        <Link to={to} className="main-button">
            {label}
        </Link>
    );
};

export default MainButton;