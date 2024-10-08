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
        try {
            const formattedDate = date.toISOString().split('T')[0];
            const data = await getHistoricalRatesByDay(formattedDate);
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
        if (type) {
            fetchRateByDate(selectedDate);
        } else {
            console.error('Type is undefined. Please provide a valid type (e.g., "oficial" or "blue").');
        }
    }, [selectedDate, type]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
            {exchangeRate && (
                <CurrencyCard 
                    title={title}
                    value_avg={exchangeRate.value_avg}
                    value_buy={exchangeRate.value_buy}
                    value_sell={exchangeRate.value_sell}
                />
            )}
        </div>
    );
};

export default DatepickerCurrency;