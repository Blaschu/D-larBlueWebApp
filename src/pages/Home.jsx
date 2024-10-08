import React, { useEffect, useState } from 'react';
import CurrencyCard from "../components/CurrencyCard";
import { getExchangeRates } from "../api/api";
import { Oval } from 'react-loader-spinner';
import "../styles/Home.css";

const Home = () => {
    const [exchangeRates, setExchangeRates] = useState(null);
    const [loading, setLoading] = useState(true);

    const types = [
        { type: 'oficial', title: 'Dólar Oficial' },
        { type: 'blue', title: 'Dólar Blue' },
        { type: 'oficial_euro', title: 'Euro Oficial' },
        { type: 'blue_euro', title: 'Euro Blue' },
    ];

    const fetchRates = async () => {
        setLoading(true);
        try {
            const data = await getExchangeRates();
            setExchangeRates(data);
        } catch (error) {
            console.error('Error fetching rates:', error);
            setExchangeRates(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
        const intervalId = setInterval(fetchRates, 300000); // Actualizar cada 5 minutos
        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <Oval color="#f3dfed" secondaryColor="#f3dfed" />;

    if (!exchangeRates) return <div>No data available</div>;

    return (
        <div className="home-container">
            <h1>Cotización del Dólar y Euro</h1>
            <div className="cards-container">
            {types.map(({ type, title }) => {
                const rateData = exchangeRates[type];
                return rateData ? (
                    
                    <CurrencyCard
                        key={type}
                        title={title}
                        value_avg={rateData.value_avg}
                        value_buy={rateData.value_buy}
                        value_sell={rateData.value_sell}
                    />
                    
                ) : (
                    <div key={type}>No data available for {title}</div>
                );
                })}
            </div>
        </div>
    );
};

export default Home;
