import React from "react";
import MainButton from "./MainButton";
import "../styles/NavBar.css";

function NavBar () {
    return (
        <nav className="navBar">
            <MainButton label="Home" to="/" />
            <MainButton label="Fecha de Cotizacion" to="/datepicker-currency" />
            <MainButton label="Gráfico histórico" to="/historical-graph" />
            <MainButton label="Gráfico de Brecha" to="/gap-graph" />
        </nav>
    );
};

export default NavBar