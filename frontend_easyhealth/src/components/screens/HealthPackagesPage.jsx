import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

const HealthPackagesPage = () => {
  // Sample data for health packages
  const packages = [
    {
      id: 1,
      name: 'Basic Health Checkup',
      price: 2500,
      description: 'This essential health screening package includes basic tests to ensure you are in good health.',
      tests: [
        'Complete Blood Count (CBC)',
        'Blood Sugar Test',
        'Cholesterol Test',
        'Liver Function Test',
      ],
      benefits: [
        'Early detection of potential health issues',
        'Affordable for regular checkups',
        'Quick and easy testing',
      ],
    },
    {
      id: 2,
      name: 'Comprehensive Health Checkup',
      price: 5000,
      description: 'A more detailed health checkup that covers a wide range of tests to give a complete picture of your health.',
      tests: [
        'Complete Blood Count (CBC)',
        'Blood Sugar Test',
        'Lipid Profile',
        'Kidney Function Test',
        'Thyroid Function Test',
        'Urine Analysis',
        'Chest X-Ray',
      ],
      benefits: [
        'Thorough testing for early disease detection',
        'Complete overview of your health',
        'Includes imaging tests like Chest X-ray',
      ],
    },
    {
      id: 3,
      name: 'Senior Citizen Health Package',
      price: 4000,
      description: 'A specialized package for senior citizens focusing on tests that monitor aging-related health concerns.',
      tests: [
        'Blood Pressure Monitoring',
        'Complete Blood Count (CBC)',
        'Kidney Function Test',
        'Bone Density Test',
        'Electrocardiogram (ECG)',
      ],
      benefits: [
        'Tailored for seniors\' unique health needs',
        'Helps monitor chronic conditions like hypertension and diabetes',
        'Includes tests for bone density and heart health',
      ],
    },
  ];

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4" style={{ color: '#3a5a40' }}>Health Packages</h1>

      <Row>
        {packages.map((pkg) => (
          <Col key={pkg.id} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow">
              <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{pkg.name}</h5>
              </Card.Header>
              <Card.Body>
                <Card.Text>{pkg.description}</Card.Text>

                {/* Test List */}
                <h6>Tests Included:</h6>
                <ul>
                  {pkg.tests.map((test, index) => (
                    <li key={index}>{test}</li>
                  ))}
                </ul>

                {/* Benefits List */}
                <h6>Package Benefits:</h6>
                <ul>
                  {pkg.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>

                <p><strong>Price:</strong> NPR {pkg.price}</p>

                <Button variant="success" className="w-100">
                  Book Package
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HealthPackagesPage;
