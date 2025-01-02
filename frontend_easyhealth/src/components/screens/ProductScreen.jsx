import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

function ProductScreen() {
  const { id } = useParams();  // Extract the product ID from the route
  const navigate = useNavigate();  // For navigation (e.g., back button)
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/product/${id}`); // Fetch product details from API
        console.log('Product data from API:', data);  // Log the response data
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product details:', err.response || err.message);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center" style={{ marginTop: '50px' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container style={{ backgroundColor: '#e4f7e4', padding: '50px 0', borderRadius: '10px' }}>
      <Button
        variant="secondary"
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '20px',
          backgroundColor: '#3a5a40', // Matches the green theme
          borderColor: '#3a5a40',
        }}
      >
        Go Back
      </Button>
      <Row>
        <Col md={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            src={`http://127.0.0.1:8000${product.image}`}  // Ensure this is your correct backend URL
            alt={product.generic_name}
            fluid
            style={{
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Col>
        <Col md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ color: '#3a5a40', fontSize: '2rem' }}>{product.name}</h1>
          <p style={{ fontSize: '1.1rem', color: '#3a5a40' }}><strong>Generic Name:</strong> {product.generic_name}</p>
          <p style={{ fontSize: '1.1rem', color: '#3a5a40' }}><strong>Category:</strong> {product.category}</p>
          <p style={{ fontSize: '1.1rem', color: '#3a5a40' }}><strong>Price:</strong> NPR {product.price || 'N/A'}</p>
          <p style={{ fontSize: '1.1rem', color: '#3a5a40' }}><strong>Description:</strong> {product.description || 'No description available.'}</p>
          <Button
            variant="primary"
            size="lg"
            style={{
              backgroundColor: '#3a5a40',  // Matches the green theme
              borderColor: '#3a5a40',
              marginTop: '20px',
            }}
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductScreen;
