import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MedicinesPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const CATEGORIES = [
    { value: 'OTC', label: 'Over-the-Counter' },
    { value: 'RX', label: 'Prescription Medicines' },
    { value: 'SUP', label: 'Supplements & Vitamins' },
    { value: 'WOM', label: "Women's Health" },
    { value: 'MEN', label: "Men's Health" },
    { value: 'PED', label: 'Pediatric Medicines' },
    { value: 'HERB', label: 'Herbal & Ayurvedic' },
    { value: 'DIAG', label: 'Diagnostics & Medical Devices' },
    { value: 'FIRST', label: 'First Aid' },
  ];

  // Fetch products with filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'http://127.0.0.1:8000/api/products/search/?';
        if (searchQuery) url += `search=${searchQuery}&`;
        if (selectedCategory) url += `category=${selectedCategory}&`;

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [searchQuery, selectedCategory]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Container fluid className="py-5">
      <h1 className="text-center text-success mb-4">Popular Products</h1>

      <Row className="mb-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control-lg"
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="form-control-lg"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Debug info - remove in production */}
      <div className="mb-3 text-muted">
        <small>
          Selected Category: {selectedCategory || 'None'} | 
          Filtered Products: {products.length}
        </small>
      </div>

      <Row className="g-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product.id} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm border-0 product-card">
                <Link 
                  to={`/product/${product.id}`} 
                  className="text-decoration-none"
                >
                  <div className="product-image-container bg-light">
                    {product.image ? (
                      <Card.Img
                        variant="top"
                        src={`http://127.0.0.1:8000${product.image}`}
                        alt={product.name}
                        className="product-image"
                      />
                    ) : (
                      <div className="no-image-placeholder">
                        No image available
                      </div>
                    )}
                  </div>
                  <Card.Body>
                    <Card.Title className="h5 text-dark">{product.name}</Card.Title>
                    <Badge 
                      bg={product.prescription_required ? 'danger' : 'success'} 
                      className="mb-2"
                    >
                      {product.prescription_required ? 'Prescription Required' : 'OTC'}
                    </Badge>
                    <Card.Text className="text-muted">
                      Category: {CATEGORIES.find(cat => cat.value === product.category)?.label || product.category}
                    </Card.Text>
                    <Card.Text className="fw-bold">
                      NPR {product.price?.toLocaleString() || 'N/A'}
                    </Card.Text>
                    {product.stock <= 0 && (
                      <Badge bg="warning" text="dark">Out of Stock</Badge>
                    )}
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <div className="text-center py-5">
              <h3 className="text-muted">No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </Col>
        )}
      </Row>

      <style jsx>{`
        .product-card {
          transition: transform 0.2s ease-in-out;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .product-image-container {
          height: 200px;
          overflow: hidden;
        }
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .no-image-placeholder {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8f9fa;
          color: #6c757d;
        }
      `}</style>
    </Container>
  );
};

export default MedicinesPage;
