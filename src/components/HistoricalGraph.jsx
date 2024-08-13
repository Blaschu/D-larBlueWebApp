import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getHistoricalRates } from "../api/api";
import '../styles/HistoricalGraph.css';

function HistoricalGraph () {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchHistoricalData = async () => {
        setLoading(true);
        try {
            const data = await getHistoricalRates();
            console.log('Historical Data', data);

            //Extraemos las fechas y los valores para los dos tipos de cambio
            const dates = data.map(item => item.data);
            const blueRates = data.map(item => item.blue.value_avg);
            const oficialRates = data.map(item => item.oficial.value_avg);

            //Configuramos los datos para el grafico
            setChartData({
                labels: dates,
                datasets: [
                    {
                        label: 'Dólar Blue',
                        data: blueRates,
                        borderColor: 'blue',
                        fill: false,
                    },
                    {
                        label: 'Dólar Oficial',
                        data: oficialRates,
                        borderColor: 'green',
                        fill: false,
                    }
                ]
            });
        } catch (error){
            console.error('Error fetching historical data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistoricalData();
    },[]);

    return (
        <div className="historical-graph-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Line data={chartData} options={{ responsive: true}} />
            )}
        </div>
    );
};

export default HistoricalGraph;