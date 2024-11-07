import React from 'react';
import { Link } from 'react-router-dom';

const cities = ['Warsaw', 'Krakow', 'Wroclaw', 'Poznan', 'Gdansk'];

function LocationList() {
  return (
    <div>
      <h2>Weather in Polish Cities</h2>
      <ul>
        {cities.map((city) => (
          <li key={city}>
            <Link to={`/location/${city.toLowerCase()}`}>{city}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationList;
