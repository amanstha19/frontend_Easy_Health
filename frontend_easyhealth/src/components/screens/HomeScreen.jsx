import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import LandingContainer from '../home /CardContainer';

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get('/api/products');
        console.log('Data from API:', data); // Log the response from API
        setProducts(data); // Directly set the data (assuming it's an array)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  console.log('Products in state:', products); // Log products after updating state

  return (
    <Container>
      <br />
       <LandingContainer />

      <h1>Popular Products</h1>
      <Row>
      {Array.isArray(products) && products.length > 0 ? (
  products.map((product) => (
    <Col key={product._id} sm={12} md={6} lg={4} xl={3} style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '200px',
        maxHeight:'auto', 
        textAlign: 'center', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
        borderRadius: '10px', 
        overflow: 'hidden' 
      }}>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ 
            width: '100%', 
            aspectRatio: '1 / 1', 
            overflow: 'hidden', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#f0f0f0' // Fallback background color
          }}>
            {product.image ? (
              <img
                src={`http://127.0.0.1:8000${product.image}`} // Update with your backend URL
                alt={product.generic_name}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
          <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{product.generic_name}</h3>
        </Link>
        <p style={{ margin: '5px 0', color: '#555' }}>Category: {product.category}</p>
        <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Price: ${product.price}</p>
      </div>
    </Col>
  ))
) : (
  <p>No products found.</p>
)}
      </Row>
    </Container>
  );
}

export default HomeScreen;
