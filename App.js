import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocationDetail from './components/LocationDetail';  // Путь до компонента
import './components/components.css';

function App() {
  const [cityName, setCityName] = useState('Wroclaw');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [units, setUnits] = useState('metric');
  const [favoriteCities, setFavoriteCities] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: { q: cityName, appid: 'c84237d3ce492140d071a31bdf06b738', units }
        });
        setWeatherData(response.data);

        const forecastResponse = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
          params: { q: cityName, appid: 'c84237d3ce492140d071a31bdf06b738', units }
        });
        setForecastData(forecastResponse.data.list);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [cityName, units]);

  return (
    <div>
      {/* Компонент LocationDetail */}
      <LocationDetail 
        cityName={cityName}
        setCityName={setCityName}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
        forecastData={forecastData}
        setForecastData={setForecastData}
        units={units}
        setUnits={setUnits}
        favoriteCities={favoriteCities}
        setFavoriteCities={setFavoriteCities}
      />
    </div>
  );
}

export default App;
