import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link for navigation

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
      <h1>Products</h1>
      <Row>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <h3>{product.generic_name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: Rs{product.price}</p>
              {/* Add the image here */}
              {product.image ? (
                <img
                  src={`http://127.0.0.1:8000${product.image}`} // Update with your backend URL
                  alt={product.generic_name}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              ) : (
                <p>No image available</p>
              )}
              {/* Add Link to product detail page */}
              <Link to={`/product/${product._id}`} className="btn btn-primary">
                View Details
              </Link>
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
