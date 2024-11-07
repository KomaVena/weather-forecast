import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Импортируем компоненты для маршрутизации
import LocationDetail from './components/LocationDetail'; // Путь к компоненту должен быть правильным

function App() {
  return (
    <Routes>
      <Route path="/" element={<LocationDetail />} /> {/* Путь для отображения компонента */}
    </Routes>
  );
}

export default App;
