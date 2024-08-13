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
        const response = await axios.get('https://bluelytics.com.ar/#!/evolution');
        return response.data;
    } catch (error) {
        console.error('Error fetching historical rates:', error);
        throw error;
    }
};