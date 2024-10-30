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
    Filler,
    TimeScale
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom'; 
import 'chartjs-adapter-date-fns';
import { getHistoricalRates } from '../api/api';
import { Oval } from 'react-loader-spinner';
import '../styles/HistoricalGraph.css';

// Registrar los componentes en Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    zoomPlugin,
    TimeScale  
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

    const options = {
        responsive: true, // Hace el gráfico responsive
        maintainAspectRatio: false, // Permite modificar el aspecto del gráfico en pantallas más pequeñas
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month',
                },
                reverse: true, // Ordena las fechas de izquierda a derecha
                ticks: {
                    autoSkip: true, // Saltar etiquetas si son muchas
                    maxTicksLimit: 50, // Máximo número de etiquetas visibles
                },
                grid: {
                    display: true, // Oculta las líneas verticales
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
            <div style={{ position: 'relative', height: '400px', width: '100%' }}>
                {chartData ? (
                    <Line data={chartData} options={options} />
                ) : (
                    <p>Loading chart...</p>,
                    <Oval color="#f3dfed" secondaryColor="#f3dfed"/>
                )}
        </div>
        </div>
    );
};

export default HistoricalGraph;
