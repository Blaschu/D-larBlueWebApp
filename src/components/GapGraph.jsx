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
import zoomPlugin from 'chartjs-plugin-zoom'; 

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    Filler,
    zoomPlugin
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

    const options = {
        responsive: true, // Hace el gráfico responsive
        maintainAspectRatio: false, // Permite modificar el aspecto del gráfico en pantallas más pequeñas
        scales: {
            x: {
                
                reverse: false, // Ordena las fechas de izquierda a derecha
                ticks: {
                    autoSkip: true, // Saltar etiquetas si son muchas
                    maxTicksLimit: 50, // Máximo número de etiquetas visibles
                },
                grid: {
                    display: true, // Oculta las líneas verticales
                },
                type: 'time',
                time: {
                    unit: 'month',
                },
                min: '2017-10-23'
            },
            y: {
                beginAtZero: false, // Empieza el gráfico desde 0
                ticks: {
                    callback: function (value) {
                        return `$${value}`; // Formatea los valores con un símbolo de dólar
                    },
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)', // Color de las líneas horizontales
                },
            },
        },
        plugins: {
            legend: {
                position: 'top', // Posiciona la leyenda en la parte superior
                labels: {
                    boxWidth: 10, // Tamaño del cuadro en la leyenda
                },
            },
            title: {
                display: true,
                text: 'Histórico de Ventas del Dólar (Oficial y Blue)',
            },
            zoom: {
                pan: {
                    enabled: true,  // Habilitar desplazamiento
                    mode: 'x',      // Solo permite desplazamiento en el eje X
                },
                zoom: {
                    wheel: {
                        enabled: true,  // Habilitar zoom con la rueda del mouse
                    },
                    pinch: {
                        enabled: true,  // Habilitar zoom en pantallas táctiles
                    },
                    mode: 'x',         // Solo hacer zoom en el eje X
                },
            },
        },
        interaction: {
            mode: 'index', // Muestra información al pasar sobre los puntos
            intersect: true, // Permite mostrar el tooltip al pasar entre puntos
        },
        animation: {
            duration: 1000, // Duración de la animación
            easing: 'easeInOutQuad', // Efecto de la animación
        },
    };

    return (
        <div className='chart-container'>
            <h2>Brecha entre Dólar Oficial y Blue</h2>
            {/* Render condicional: solo muestra el gráfico si hay datos */}
            {chartData.labels.length > 0 && <Line data={chartData} options={options}/>}
        </div>
    );
};

export default GapGraph;
