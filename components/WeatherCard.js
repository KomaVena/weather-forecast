import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import './components.css';

const WeatherCard = ({ cityName, weatherData, units, addToFavorites, rainText }) => {
  return (
    <Card>
      <Card.Header as="h5" className="weather-card-header">
        {cityName}
        <Button
          variant="outline-warning"
          size="sm"
          className="weather-card-button"
          onClick={() => addToFavorites(cityName)}
        >
          <FaStar />
        </Button>
      </Card.Header>
      <Card.Body className="weather-card-container">
        <h3>
          Temperatura: {weatherData.main.temp}° {units === 'metric' ? 'C' : units === 'imperial' ? 'F' : 'K'}
        </h3>
        <p>Pogoda: {weatherData.weather[0].description}</p>
        <p>Wilgotność: {weatherData.main.humidity}%</p>
        <p>Prędkość wiatru: {weatherData.wind.speed} m/s</p>
        <p>{rainText}</p>
        <p>Stopień zachmurzenia: {weatherData.clouds.all}%</p>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
