import React, { useEffect, useState } from 'react';
import CurrencyCard from "../components/CurrencyCard";
import { getExchangeRates } from "../api/api";
import { Oval } from 'react-loader-spinner';
import "../styles/Home.css";

const Home = () => {
    const [exchangeRate, setExchangeRate] = useState(null);
    const [loading, setLoading] = useState(true);
    

    const types = [
        { type: 'oficial', title: 'Dólar Oficial' },
        { type: 'blue', title: 'Dólar Blue' },
        { type: 'euro_oficial', title: 'Euro Oficial' },
        { type: 'euro_blue', title: 'Euro Blue'},
    ];

    const fetchRate = async () => {
        setLoading(true);
        try {
            const data = await getExchangeRates();
            const rateData = data[type];
            if (rateData) {
                setExchangeRate(rateData);
            } else {
                throw new Error(`No data available for type: ${type}`);
            }
        } catch (error) {
            console.error('Error fetching rate:', error);
            setExchangeRate(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRate();
        const intervalId = setInterval(fetchRate, 300000); // Actualizar cada 5 minutos
        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <Oval color="#f3dfed" secondaryColor="#f3dfed" />;

    if (!exchangeRate) return <div>No data available for {title}</div>;

    return (
        <div className='home-container'>
            {types.map(({ type, title }) => {
                const rateData = exchangeRate[type];
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
    );
};

export default Home;
