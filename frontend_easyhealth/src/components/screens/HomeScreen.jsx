import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get('/api/products');
        console.log('Data from API:', data);  // Check the returned data
        setProducts(data.products);  // Set the products in the state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  console.log('Products in state:', products);  // Log products after updating state

  return (
    <Container>
      <br />
      <h1>Products</h1>
      <Row>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <h3>{product.productname}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
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
