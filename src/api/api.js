import axios from 'axios';

export const getExchangeRates = async () => {
    try {
        const response = await axios.get('https://api.bluelytics.com.ar/v2/latest');
        return response.data;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        throw error;
    }
};

export const getHistoricalRates = async () => {
    try {
        const response = await axios.get('https://api.bluelytics.com.ar/v2/evolution.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching historical rates:', error);
        throw error;
    }
};

export const getHistoricalRatesByDay = async (date) => {
    try {
        const response = await axios.get(`https://api.bluelytics.com.ar/v2/historical?day=${date}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching historical rates for ${date}:`, error);
        throw error;
    }
};