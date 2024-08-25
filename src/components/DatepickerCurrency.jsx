import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getHistoricalRatesByDay } from '../api/api';
import "../styles/CurrencyCard.css";

const DatepickerCurrency = ({ title, type }) => {
    const [selectedDate, setSelectedDate] = useState(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
    });

    const [exchangeRate, setExchangeRate] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchRateByDate = async (date) => {
        setLoading(true);
        const formattedDate = date.toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];

        if (formattedDate >= today) {
            console.warn(`No data available for ${formattedDate}. The date is too recent.`);
            setExchangeRate(null);
            setLoading(false);
            return;
        }

        try {
            const data = await getHistoricalRatesByDay(formattedDate);
            const rateData = data[type];

            if (rateData) {
                setExchangeRate(rateData);
            } else {
                console.warn(`No data available for type: ${type} on ${formattedDate}`);
                setExchangeRate(null);
            }
        } catch (error) {
            console.error('Error fetching rate:', error);
            setExchangeRate(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (type) {
            fetchRateByDate(selectedDate);
        } else {
            console.error('Type is undefined. Please provide a valid type (e.g., "oficial" or "blue").');
        }
    }, [selectedDate, type]);

    if (loading) return <div>Loading...</div>;

    if (!exchangeRate) return <div>No data available for {title}</div>;

    const { value_avg, value_buy, value_sell } = exchangeRate;

    return (
        <div className="currency-card">
            <h3>{title}</h3>
            <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
            <p>Promedio: ${value_avg ? value_avg.toFixed(2) : 'N/A'}</p>
            <p>Compra: ${value_buy ?? 'N/A'}</p>
            <p>Venta: ${value_sell ?? 'N/A'}</p>
        </div>
    );
};

export default DatepickerCurrency;
