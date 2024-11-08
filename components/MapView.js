import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ coordinates }) => {
  useEffect(() => {
    // Инициализация карты при первом рендере или изменении координат
    const map = L.map('map', {
      center: [coordinates.lat, coordinates.lon], // Центрируем карту на переданных координатах
      zoom: 12, // Начальный уровень зума
      scrollWheelZoom: false, // Отключаем зум при прокрутке мышью (если нужно)
    });

    // Добавляем слой карты OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Очистка карты, если компонент будет удален или координаты изменятся
    return () => {
      map.remove();
    };
  }, [coordinates]); // Обновляем карту только при изменении координат

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

export default MapView;
