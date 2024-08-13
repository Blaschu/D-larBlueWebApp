import React from "react";
import { Link } from 'react-router-dom';
import "../styles/NavBar.css";

function NavBar () {
    return (
        <div className="navBar">
            <ul className="nav-list">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/datepicker-currency">Datepicker Currency</Link>
                </li>
                <li>
                    <Link to="/historical-graph">Historical Graph</Link>
                </li>
                <li>
                    <Link to="gap-graph">Gap Graph</Link>
                </li>
            </ul>
        </div>
    )
}

export default NavBar