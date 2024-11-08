import React from 'react';
import { Card } from 'react-bootstrap';

const Forecast = ({ forecastData, sliceStart, sliceEnd, title }) => {
  return (
    <Card>
      <Card.Header as="h5">{title}</Card.Header>
      <Card.Body style={{ fontSize: '0.9rem' }}>
        {forecastData.length > 0 ? (
          <ul>
            {forecastData.slice(sliceStart, sliceEnd).map((forecast, index) => (
              <li key={index}>
                <p>{new Date(forecast.dt_txt).toLocaleDateString()}</p>
                <p>Temperatura: {forecast.main.temp}°</p>
                <p>Opis: {forecast.weather[0].description}</p>
                <p>Wiatr: {forecast.wind.speed} m/s</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Brak danych prognozy.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default Forecast;
