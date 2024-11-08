import React from 'react';
import './components.css'; 

const UnitSelector = ({ units, handleUnitChange }) => {
  return (
    <div className="unit-selector-container">
      <label>Wybierz jednostki:</label>
      <select value={units} onChange={(e) => handleUnitChange(e.target.value)}>
        <option value="metric">Celsius (°C)</option>
        <option value="imperial">Fahrenheit (°F)</option>
        <option value="standard">Kelvin (K)</option>
      </select>
    </div>
  );
};

export default UnitSelector;
