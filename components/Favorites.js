import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const Favorites = ({ favoriteCities, removeFromFavorites }) => {
  return (
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
  );
};

export default Favorites;
