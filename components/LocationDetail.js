import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import WeatherCard from './WeatherCard';
import CitySelect from './CitySelect';
import UnitSelector from './UnitSelector';
import CitySearch from './CitySearch';
import Favorites from './Favorites';
import Forecast from './Forecast';
import MapView from './MapView';

const API_KEY = 'c84237d3ce492140d071a31bdf06b738';
const cities = ['Wroclaw', 'Warsaw', 'Krakow', 'Gdansk', 'Poznan', 'Lodz', 'Szczecin', 'Lublin'];

const LocationDetail = () => {
  const [cityName, setCityName] = useState('Wroclaw');
  const [weatherData, setWeatherData] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 51.107, lon: 17.038 });
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [units, setUnits] = useState('metric');
  const [searchTerm, setSearchTerm] = useState('');

  // Запросы для текущей погоды и прогноза
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Запрос для текущей погоды
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: { q: cityName, appid: API_KEY, units }
        });
        setWeatherData(response.data);
        setCoordinates({ lat: response.data.coord.lat, lon: response.data.coord.lon });

        // Запрос для прогноза погоды
        const forecastResponse = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
          params: { q: cityName, appid: API_KEY, units }
        });

        // Добавляем данные осадков
        const forecastWithRain = forecastResponse.data.list.map(item => {
          const rain = item.rain ? item.rain['3h'] : 0; // Если нет данных о дождях, ставим 0
          return { ...item, rain };
        });

        setForecastData(forecastWithRain); // Обновляем данные с осадками
      } catch (error) {
        console.error("Не удалось получить данные о погоде", error);
      }
    };

    fetchWeatherData();
  }, [cityName, units]); // Перезапрос данных при изменении города или единиц измерения

  // Обработчики для изменения города, добавления/удаления из избранного и смены единиц измерения
  const handleCityChange = (city) => setCityName(city);
  const addToFavorites = (city) => setFavoriteCities((prev) => !prev.includes(city) ? [...prev, city] : prev);
  const removeFromFavorites = (city) => setFavoriteCities((prev) => prev.filter(fav => fav !== city));
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setCityName(searchTerm);
      setSearchTerm('');
    }
  };
  const handleUnitChange = (newUnit) => setUnits(newUnit);

  // Если данные не загружены, отображаем индикатор загрузки
  if (!weatherData) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  // Извлекаем осадки для текущего города
  const rain = weatherData.rain ? weatherData.rain['1h'] : 0; // Осадки за последний час
  const rainText = rain > 0 ? 
    `Prawdopodobieństwo opadów: ${rain} mm/h` : 
    'Brak opadów';

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <CitySelect cities={cities} handleCityChange={handleCityChange} />
        </Col>
        <Col md={8}>
          <WeatherCard 
            cityName={cityName} 
            weatherData={weatherData} 
            units={units} 
            addToFavorites={addToFavorites} 
            rainText={rainText} 
          />
          <MapView coordinates={coordinates} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <UnitSelector units={units} handleUnitChange={handleUnitChange} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <CitySearch 
            searchTerm={searchTerm} 
            handleSearchChange={handleSearchChange} 
            handleSearchSubmit={handleSearchSubmit} 
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Favorites 
            favoriteCities={favoriteCities} 
            removeFromFavorites={removeFromFavorites} 
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Forecast forecastData={forecastData} sliceStart={0} sliceEnd={3} title="Prognoza na 5 dni - Kolumna 1" />
        </Col>
        <Col md={6}>
          <Forecast forecastData={forecastData} sliceStart={3} sliceEnd={5} title="Prognoza na 5 dni - Kolumna 2" />
        </Col>
      </Row>
    </Container>
  );
};

export default LocationDetail;
