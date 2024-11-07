import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, ButtonGroup, Card, Row, Col, Container, Spinner, Form } from 'react-bootstrap';
import { FaStar, FaTrash } from 'react-icons/fa';


const API_KEY = 'c84237d3ce492140d071a31bdf06b738'; // Twój klucz API

const cities = [
  'Wroclaw', 'Warsaw', 'Krakow', 'Gdansk', 'Poznan', 'Lodz', 'Szczecin', 'Lublin'
];

const LocationDetail = () => {
  const [cityName, setCityName] = useState('Wroclaw');
  const [weatherData, setWeatherData] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 51.107, lon: 17.038 });
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [units, setUnits] = useState('metric'); // domyślnie Celsjusz
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Pobierz dane bieżącej pogody
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: cityName,
            appid: API_KEY,
            units: units
          }
        });
        setWeatherData(response.data);
        setCoordinates({
          lat: response.data.coord.lat,
          lon: response.data.coord.lon
        });

        // Pobierz prognozę pogody na 5 dni
        const forecastResponse = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
          params: {
            q: cityName,
            appid: API_KEY,
            units: units
          }
        });
        setForecastData(forecastResponse.data.list);
      } catch (error) {
        console.error("Nie udało się pobrać danych o pogodzie", error);
      }
    };

    fetchWeatherData();
  }, [cityName, units]);

  const handleCityChange = (city) => {
    setCityName(city);
  };

  const addToFavorites = (city) => {
    setFavoriteCities((prevFavorites) => {
      if (!prevFavorites.includes(city)) {
        return [...prevFavorites, city];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (city) => {
    setFavoriteCities((prevFavorites) => prevFavorites.filter(favoriteCity => favoriteCity !== city));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setCityName(searchTerm);
      setSearchTerm('');
    }
  };

  const handleUnitChange = (newUnit) => {
    setUnits(newUnit);
  };

  if (!weatherData) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header as="h5">Wybierz miasto</Card.Header>
            <Card.Body>
              <ButtonGroup vertical className="w-100">
                {cities.map((city) => (
                  <Button
                    key={city}
                    variant="outline-primary"
                    className="mb-2 w-100"
                    onClick={() => handleCityChange(city)}
                    style={{ fontSize: '0.9rem' }}
                  >
                    {city}
                  </Button>
                ))}
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Header as="h5">
              {cityName}
              <Button
                variant="outline-warning"
                size="sm"
                className="ml-3"
                onClick={() => addToFavorites(cityName)}
                style={{ marginLeft: '10px', fontSize: '0.8rem' }}
              >
                <FaStar />
              </Button>
            </Card.Header>
            <Card.Body>
              <h3 style={{ fontSize: '1.2rem' }}>
                Temperatura: {weatherData.main.temp}° {units === 'metric' ? 'C' : units === 'imperial' ? 'F' : 'K'}
              </h3>
              <p style={{ fontSize: '0.9rem' }}>Pogoda: {weatherData.weather[0].description}</p>
              <p style={{ fontSize: '0.9rem' }}>Wilgotność: {weatherData.main.humidity}%</p>
              <p style={{ fontSize: '0.9rem' }}>Prędkość wiatru: {weatherData.wind.speed} m/s</p>
              <p style={{ fontSize: '0.9rem' }}>Prawdopodobieństwo opadów: {weatherData.rain ? weatherData.rain['1h'] : '0'} mm/h</p>
              <p style={{ fontSize: '0.9rem' }}>Stopień zachmurzenia: {weatherData.clouds.all}%</p>

              <div style={{ position: 'relative', height: '250px' }}>
                <MapContainer
                  key={coordinates.lat + coordinates.lon}
                  center={[coordinates.lat, coordinates.lon]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                </MapContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Formularz zmiany jednostek */}
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header as="h5">Wybór jednostek temperatury</Card.Header>
            <Card.Body>
              <ButtonGroup className="mb-2">
                <Button variant={units === 'metric' ? 'primary' : 'outline-primary'} onClick={() => handleUnitChange('metric')}>
                  °C
                </Button>
                <Button variant={units === 'imperial' ? 'primary' : 'outline-primary'} onClick={() => handleUnitChange('imperial')}>
                  °F
                </Button>
                <Button variant={units === 'standard' ? 'primary' : 'outline-primary'} onClick={() => handleUnitChange('standard')}>
                  K
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Formularz wyszukiwania miast */}
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header as="h5">Szukaj miasta</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSearchSubmit}>
                <Form.Control
                  type="text"
                  placeholder="Wpisz miasto..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Button variant="primary" type="submit" className="mt-2 w-100">
                  Szukaj
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Wyświetlanie ulubionych miast */}
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header as="h5">Ulubione miasta</Card.Header>
            <Card.Body>
              {favoriteCities.length > 0 ? (
                <ul>
                  {favoriteCities.map((city, index) => (
                    <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      {city}
                      <Button
                        variant="danger"
                        size="sm"
                        className="ml-3"
                        onClick={() => removeFromFavorites(city)}
                      >
                        <FaTrash />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nie masz jeszcze żadnych ulubionych miast.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Prognoza na 5 dni */}
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Prognoza na 5 dni - Kolumna 1</Card.Header>
            <Card.Body style={{ fontSize: '0.9rem' }}>
              {forecastData.length > 0 ? (
                <ul>
                  {forecastData.slice(0, 3).map((forecast, index) => (
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
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header as="h5">Prognoza na 5 dni - Kolumna 2</Card.Header>
            <Card.Body style={{ fontSize: '0.9rem' }}>
              {forecastData.length > 0 ? (
                <ul>
                  {forecastData.slice(3, 5).map((forecast, index) => (
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
        </Col>
      </Row>
    </Container>
  );
};

export default LocationDetail;
