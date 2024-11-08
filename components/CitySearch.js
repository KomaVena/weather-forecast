import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const CitySearch = ({ searchTerm, handleSearchChange, handleSearchSubmit }) => {
  return (
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
  );
};

export default CitySearch;
