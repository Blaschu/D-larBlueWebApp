import React from "react";
import CurrencyCard from "../components/CurrencyCard";
import "../styles/Home.css";

function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">Cotizaciones del Dólar y Euro</h1>

            <div className="cards-container">
                <CurrencyCard title={"Dólar Oficial"} type="oficial" />
                <CurrencyCard title={"Dólar Blue"} type="blue" />
                <CurrencyCard title={"Euro Oficial"} type="oficial_euro" />
                <CurrencyCard title={"Euro Blue"} type="blue_euro" />
            </div>

        </div>
    );
};

export default Home;