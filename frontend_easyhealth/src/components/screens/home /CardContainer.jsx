import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './LandingContainer.css'; // Custom CSS for styling the container
import { useNavigate } from 'react-router-dom';

function LandingContainer() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/home?search=${searchQuery}`);
    }
  };

  return (
    <div className="landing-container">
      <Container fluid className="text-center py-5">
        <Row>
          <Col>
            <h1 className="landing-title">Welcome to Easy Health</h1>
            <p className="landing-subtitle">
              Your one-stop platform for managing medications, lab tests, and health records.
            </p>
            <Form onSubmit={handleSearch} className="search-form">
              <Form.Control
                type="text"
                placeholder="Search for products, medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <Button variant="success" type="submit" className="search-button">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandingContainer;
