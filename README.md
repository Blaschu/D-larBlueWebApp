La aplicación es una herramienta de consulta de cotizaciones basada enla API de Bluelytics,
donde los usuarios pueden ver y comprar las tasa de cambio de diferentes fechas y tipos de cambio.

# Carateristicas #

## Componentes Principales: ##

    Home: Muestra las cotizaciones actuales y se actualiza automáticamente cada 5 minutos.
    DatepickerCurrency: Permite seleccionar una fecha para obtener las tasas de cambio de ese día específico. Muestra valores de compra, venta, y promedio.
    GapGraph: Muestra la brecha entre el dólar y el dólar blue.
    HistoricalGraph: Utiliza Chart.js para graficar las cotizaciones a lo largo del tiempo.

## Uso de APIs: ##

    Se obtiene datos histórico y actuales de la API de Bluelytics.
    Implementación de llamada a la API para diferentes endspoints, como la obtención de tasas históricas por fecha.

## Biblotecas Y Herramientas: ##

    React para la contruccion de la interfaz.
    React Router Dom para el enrutamiento.
    React Datepicker para la selección de fechas.
    Chart.js para visualización de datos en gráficos.
