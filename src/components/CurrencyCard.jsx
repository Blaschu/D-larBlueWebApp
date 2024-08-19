import React, { useEffect, useState } from 'react';
import { getExchangeRates } from "../api/api";
import { Oval } from 'react-loader-spinner';
import "../styles/CurrencyCard.css"

const CurrencyCard = ({ title, type }) => {
    const [exchangeRate, setExchangeRate] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchRate = async () => {
        setLoading(true);
        try {
            const data = await getExchangeRates();
            console.log('Latest Rate Data:', data);

            // Obtenemos datos actuales para el tipo específico
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
        // Fetch the initial rate
        fetchRate();

        // Set an interval to fetch the rate every 5 minutes
        const intervalId = setInterval(fetchRate, 300000); // 300,000 ms = 5 min

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <Oval color="#f3dfed" secondaryColor="#f3dfed" />;

    console.log('Exchange Rate:', exchangeRate);

    if (!exchangeRate) return <div>No data available for {title}</div>;

    const { value_avg, value_buy, value_sell } = exchangeRate;

    return (
        <div className="currency-card">
            <h3>{title}</h3>
            <p>Promedio: ${value_avg ? value_avg.toFixed(2) : 'N/A'}</p>
            <p>Compra: ${value_buy ?? 'N/A'}</p>
            <p>Venta: ${value_sell ?? 'N/A'}</p>
        </div>
    );
};

export default CurrencyCard;
