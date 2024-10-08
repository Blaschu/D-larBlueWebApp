import React from "react";
import MainButton from "./MainButton";
import "../styles/NavBar.css";

function NavBar () {
    return (
        <nav className="navBar">
            <MainButton label="Home" to="/" />
            <MainButton label="Fecha de Cotizacion(no available)" to="" />
            <MainButton label="Gráfico histórico(no available)" to="" />
            <MainButton label="Gráfico de Brecha(no available)" to="" />
        </nav>
    );
};

export default NavBar