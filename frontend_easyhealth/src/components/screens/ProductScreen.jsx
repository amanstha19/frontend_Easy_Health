import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

function ProductScreen() {
  const { id } = useParams(); // Extract the product ID from the route
  const navigate = useNavigate(); // For navigation (e.g., back button)
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/product/${id}`); // Fetch product details from API
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product details:', err);
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
    <Container>
      <Button variant="secondary" onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        Go Back
      </Button>
      <Row>
        <Col md={6}>
          <Image
            src={`http://127.0.0.1:8000${product.image}`} // Adjust the backend URL accordingly
            alt={product.generic_name}
            fluid
          />
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <p><strong>Generic Name:</strong> {product.generic_name}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> NPR {product.price || 'N/A'}</p>
          <p><strong>Description:</strong> {product.description || 'No description available.'}</p>
          <Button variant="primary" size="lg">
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductScreen;
