import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Замените useHistory на useNavigate
import { Form } from 'react-bootstrap';

const cities = ['Warsaw', 'Krakow', 'Wroclaw', 'Poznan', 'Gdansk'];  // Список городов

function LocationSelector() {
  const navigate = useNavigate();  // Создаём экземпляр useNavigate
  const [selectedCity, setSelectedCity] = useState('Wroclaw');  // По умолчанию Wroclaw

  useEffect(() => {
    // При изменении выбранного города, переходим на новую страницу с этим городом
    navigate(`/location/${selectedCity}`);  // Используем navigate для перехода
  }, [selectedCity, navigate]);

  return (
    <div className="mt-4">
      <h2 className="text-center">Выберите город</h2>
      <Form.Group controlId="citySelect" className="text-center">
        <Form.Control
          as="select"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}  // Обновляем состояние выбранного города
          className="w-50 mx-auto"
        >
          {cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
}

export default LocationSelector;
