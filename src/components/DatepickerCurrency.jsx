import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import CurrencyCard from './CurrencyCard';
import 'react-datepicker/dist/react-datepicker.css';
import { getHistoricalRatesByDay } from '../api/api';
import "../styles/CurrencyCard.css";

const DatepickerCurrency = ({ title }) => {
    const [selectedDate, setSelectedDate] = useState(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
    });
    const [exchangeRates, setExchangeRates] = useState({ oficial: null, blue: null });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRateByDate = async (date) => {
        setLoading(true);
        setError(null); // Reiniciar el estado de error antes de cada petición
        try {
            const formattedDate = date.toISOString().split('T')[0];
            const data = await getHistoricalRatesByDay(formattedDate);
            if (data.oficial && data.blue) {
                setExchangeRates({
                    oficial: data.oficial,
                    blue: data.blue,
                });
            } else {
                throw new Error('No data available for selected date');
            }
        } catch (error) {
            console.error('Error fetching rate:', error);
            setError('An error occurred while fetching the exchange rate');
            setExchangeRates({ oficial: null, blue: null });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRateByDate(selectedDate);
    }, [selectedDate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="cards-container-picker">
            <div>
                <h2>Seleciona la fecha</h2>
                <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
            </div>
            {exchangeRates.oficial && exchangeRates.blue && (
                <>
                    {/* CurrencyCard para el dólar oficial */}
                    <CurrencyCard
                        title={`${title}`}
                        value_avg={exchangeRates.oficial.value_avg}
                        value_buy={exchangeRates.oficial.value_buy}
                        value_sell={exchangeRates.oficial.value_sell}
                    />

                    {/* CurrencyCard para el dólar blue */}
                    <CurrencyCard
                        title={"Dólar Blue"}
                        value_avg={exchangeRates.blue.value_avg}
                        value_buy={exchangeRates.blue.value_buy}
                        value_sell={exchangeRates.blue.value_sell}
                    />
                </>
            )}
        </div>
    );
};

export default DatepickerCurrency;
