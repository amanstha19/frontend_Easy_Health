import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Changed from useHistory to useNavigate

const LabTestsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const labTests = [
    {
      id: 1,
      name: 'Complete Blood Count (CBC)',
      price: 1200,
      description: 'Measures the number of red blood cells, white blood cells, and platelets in your blood.',
      duration: '15-20 minutes',
      preparation: 'No preparation required.',
      resultsTime: '1-2 days',
    },
    {
      id: 2,
      name: 'Lipid Profile',
      price: 1500,
      description: 'Measures cholesterol levels to assess the risk of heart disease.',
      duration: '10-15 minutes',
      preparation: 'Fasting for 12 hours prior to the test.',
      resultsTime: '1-2 days',
    },
    {
      id: 3,
      name: 'Blood Sugar Test',
      price: 800,
      description: 'Measures the glucose level in your blood to help diagnose diabetes.',
      duration: '5-10 minutes',
      preparation: 'Fasting for 8-10 hours prior to the test.',
      resultsTime: '1-2 days',
    },
  ];

  const filteredTests = labTests.filter((test) =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookTest = (testId) => {
    navigate(`/book-test/${testId}`); // Correctly using navigate to change the route
  };

  const handleShowModal = (test) => {
    setSelectedTest(test);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTest(null);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4" style={{ color: '#3a5a40' }}>Laboratory Tests</h1>

      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Form.Control
            type="search"
            placeholder="Search lab tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      <Row>
        {filteredTests.map((test) => (
          <Col key={test.id} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow">
              <Card.Body>
                <Card.Title>{test.name}</Card.Title>
                <Card.Text>{test.description}</Card.Text>
                <p><strong>Duration:</strong> {test.duration}</p>
                <p><strong>Price:</strong> NPR {test.price}</p>
                <p><strong>Preparation:</strong> {test.preparation}</p>
                <p><strong>Results Time:</strong> {test.resultsTime}</p>

                <Button
                  variant="info"
                  className="me-2"
                  onClick={() => handleShowModal(test)}
                >
                  View Details
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleBookTest(test.id)}
                >
                  Book Test
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for viewing test details */}
      {selectedTest && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedTest.name} - Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Description:</strong> {selectedTest.description}</p>
            <p><strong>Duration:</strong> {selectedTest.duration}</p>
            <p><strong>Price:</strong> NPR {selectedTest.price}</p>
            <p><strong>Preparation:</strong> {selectedTest.preparation}</p>
            <p><strong>Results Time:</strong> {selectedTest.resultsTime}</p>
            <p><strong>Important Notes:</strong> Ensure to follow the preparation guidelines for accurate results.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => handleBookTest(selectedTest.id)}
            >
              Book Test
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default LabTestsPage;