import React from 'react';
import "../styles/CurrencyCard.css"

const CurrencyCard = ({ title, value_avg, value_buy, value_sell }) => (
    <div className="currency-card">
        <h3>{title}</h3>
        <p>Promedio: ${value_avg ? value_avg.toFixed(2) : 'N/A'}</p>
        <p>Compra: ${value_buy ?? 'N/A'}</p>
        <p>Venta: ${value_sell ?? 'N/A'}</p><br/>
    </div>
);

export default CurrencyCard;
