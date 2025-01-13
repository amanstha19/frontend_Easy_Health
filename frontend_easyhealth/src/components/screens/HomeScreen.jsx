import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import LandingContainer from './home /CardContainer';

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get('/api/products');
        console.log('Data from API:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  console.log('Products in state:', products);

  return (
    <Container>
      <br />
      <LandingContainer />

      {/* Featured Categories Section */}
      <div className="categories-section" style={{ marginTop: '50px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '30px', color: '#3a5a40' }}>Explore Our Categories</h2>
        <Row>
          <Col sm={12} md={4}>
            <div className="category-card" style={{ padding: '20px', backgroundColor: '#e4f7e4', textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#2d2d2d' }}>Medicines</h3>
              <p style={{ color: '#333' }}>Browse a wide range of medicines for all your needs.</p>
              <Link to="/category/medicines">
                <Button variant="outline-success" style={{ borderColor: '#4CAF50', color: '#4CAF50' }}>Shop Medicines</Button>
              </Link>
            </div>
          </Col>
          <Col sm={12} md={4}>
            <div className="category-card" style={{ padding: '20px', backgroundColor: '#e4f7e4', textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#2d2d2d' }}>Lab Tests</h3>
              <p style={{ color: '#333' }}>Book your lab tests online with ease and convenience.</p>
              <Link to="/category/lab-tests">
                <Button variant="outline-success" style={{ borderColor: '#4CAF50', color: '#4CAF50' }}>Explore Tests</Button>
              </Link>
            </div>
          </Col>
          <Col sm={12} md={4}>
            <div className="category-card" style={{ padding: '20px', backgroundColor: '#e4f7e4', textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#2d2d2d' }}>Health Packages</h3>
              <p style={{ color: '#333' }}>Choose from our comprehensive health packages for better care.</p>
              <Link to="/category/health-packages">
                <Button variant="outline-success" style={{ borderColor: '#4CAF50', color: '#4CAF50' }}>View Packages</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>

      {/* Popular Products Section */}
      <h1 id="products" style={{ textAlign: 'center', color: '#3a5a40', fontSize: '2.5rem', marginTop: '50px' }}>Popular Products</h1>
      <Row>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => {
            return (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3} style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '250px',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#f8f8f8',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    border: '1px solid #e4f7e4',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div
                      style={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#e4f7e4',
                      }}
                    >
                      {product.image ? (
                        <img
                          src={`http://127.0.0.1:8000${product.image}`}
                          alt={product.generic_name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', margin: '10px 0', color: '#333' }}>{product.generic_name}</h3>
                  </Link>
                  <p style={{ margin: '5px 0', color: '#555' }}>Category: {product.category}</p>
                  <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#2d2d2d' }}>Price: NPR{product.price || 'N/A'}</p>
                </div>
              </Col>
            );
          })
        ) : (
          <p>No products found.</p>
        )}
      </Row>

      {/* Health Tips & Insights Section */}
      <div className="health-tips-section" style={{ padding: '50px 0', backgroundColor: '#e4f7e4' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '30px', color: '#3a5a40' }}>Health Tips & Insights</h2>
        <Row>
          <Col sm={12} md={4}>
            <div className="tip-card" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #d1e7d1' }}>
              <h3>Did You Know?</h3>
              <p>Drinking water first thing in the morning helps to kickstart your metabolism and hydrate your body!</p>
            </div>
          </Col>
          <Col sm={12} md={4}>
            <div className="tip-card" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #d1e7d1' }}>
              <h3>Healthy Eating Tips</h3>
              <p>Incorporate more leafy greens into your diet. They're packed with essential vitamins and minerals!</p>
            </div>
          </Col>
          <Col sm={12} md={4}>
            <div className="tip-card" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #d1e7d1' }}>
              <h3>Exercise & Wellness</h3>
              <p>Regular physical activity helps to improve mood, reduce stress, and maintain a healthy weight.</p>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default HomeScreen;
