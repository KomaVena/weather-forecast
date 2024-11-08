import React from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';

const CitySelect = ({ cities, handleCityChange }) => {
  return (
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
  );
};

export default CitySelect;
