import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { getHistoricalRates } from '../api/api';
import '../styles/HistoricalGraph.css';

// Registrar los componentes en Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const HistoricalGraph = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            try {
                const data = await getHistoricalRates();
                const formattedData = {
                    labels: data.map(item => item.date),
                    datasets: [
                        {
                            label: 'Venta Oficial',
                            data: data
                                .filter(item => item.source === 'Oficial')
                                .map(item => item.value_sell),
                            borderColor: 'blue',
                            fill: false,
                        },
                        {
                            label: 'Venta Blue',
                            data: data
                                .filter(item => item.source === 'Blue')
                                .map(item => item.value_sell),
                            borderColor: 'red',
                            fill: false,
                        },
                    ],
                };
                setChartData(formattedData);
            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
        };

        fetchHistoricalData();
    }, []);

    return (
        <div>
            {chartData ? (
                <Line data={chartData} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default HistoricalGraph;
