import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { getHistoricalRates } from '../api/api';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, 
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    Filler
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    Filler
);

const GapGraph = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: '',
            data: [],
            borderColor: '',
            backgroundColor: '',
        }],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHistoricalRates();
                const dates = [];
                const gaps = [];
                
                data.forEach((rate) => {
                    if (rate.source === "Oficial") {
                        dates.push(rate.date);

                        const blueRate = data.find(r => r.date === rate.date && r.source === "Blue")?.value_sell;
                        const officialRate = rate.value_sell;

                        // Asegúrate de que ambos valores existen antes de calcular la brecha
                        if (blueRate && officialRate) {
                            const gap = ((blueRate - officialRate) / officialRate) * 100;
                            gaps.push(gap.toFixed(2)); // Guardamos el porcentaje de brecha
                        }
                    }
                });

                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Brecha % (Blue vs. Oficial)',
                            data: gaps,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                            tension: 0.4
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching and calculating gap:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Brecha entre Dólar Oficial y Blue</h2>
            {/* Render condicional: solo muestra el gráfico si hay datos */}
            {chartData.labels.length > 0 && <Line data={chartData} />}
        </div>
    );
};

export default GapGraph;
