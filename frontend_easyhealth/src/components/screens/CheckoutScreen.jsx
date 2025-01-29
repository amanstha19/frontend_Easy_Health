import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, ListGroup, Image, Card, Spinner } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
  background: {
    backgroundColor: '#d3f8d3',
    minHeight: '100vh',
    padding: '20px 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  card: {
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  cardBody: {
    padding: '20px',
  },
  title: {
    color: '#2c6b2f',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  totalPrice: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#2c6b2f',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  formControl: {
    borderRadius: '8px',
  },
};

const CheckoutScreen = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to COD
  const [prescriptionRequired, setPrescriptionRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const requiresPrescription = cartItems.some(item => item.prescriptionRequired);
    setPrescriptionRequired(requiresPrescription);

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handlePrescriptionUpload = (e) => {
    setPrescription(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items to the cart before proceeding to checkout.');
      return;
    }

    if (prescriptionRequired && !prescription) {
      alert('Please upload your prescription.');
      return;
    }

    const formData = new FormData();
    formData.append('address', address);
    formData.append('payment_method', paymentMethod);
    if (prescriptionRequired) {
      formData.append('prescription', prescription);
    }
    formData.append('cart_items', JSON.stringify(cartItems));

    setLoading(true);

    try {
      const userToken = sessionStorage.getItem('authTokens');
      if (!userToken) {
        alert('You must be logged in to proceed with the checkout.');
        navigate('/login');
        return;
      }

      const parsedToken = JSON.parse(userToken);
      const token = parsedToken?.access;

      if (!token) {
        alert('Invalid token. Please login again.');
        navigate('/login');
        return;
      }

      const response = await axios.post('http://localhost:8000/api/order/place/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (paymentMethod === 'cod') {
        // Redirect to success page immediately if COD
        navigate(`/order-success/${response.data.order_id}`);
      } else {
        // Redirect to Stripe payment if online payment
        navigate(`/payment/${response.data.order_id}/${totalPrice}`);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('There was an error processing your checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h1 className="text-center mb-4" style={styles.title}>Checkout</h1>
        <Row>
          <Col md={8}>
            <Card style={styles.card}>
              <Card.Body style={styles.cardBody}>
                <h2>Cart Items</h2>
                {cartItems.length === 0 ? (
                  <div>Your cart is empty</div>
                ) : (
                  <ListGroup>
                    {cartItems.map((item) => (
                      <ListGroup.Item key={item.id}>
                        <Row>
                          <Col md={2}>
                            <Image src={`http://127.0.0.1:8000${item.image}`} alt={item.name} fluid />
                          </Col>
                          <Col md={6}>
                            <h5>{item.name}</h5>
                            <p>Price: NPR {item.price}</p>
                          </Col>
                          <Col md={4}>
                            <p>Quantity: {item.quantity}</p>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
                <div style={styles.totalPrice}>
                  <strong>Total Price: NPR {totalPrice}</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={styles.card}>
              <Card.Body style={styles.cardBody}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="address">
                    <Form.Label>Delivery Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your delivery address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      style={styles.formControl}
                    />
                  </Form.Group>

                  {prescriptionRequired && (
                    <Form.Group controlId="prescription">
                      <Form.Label>Upload Prescription</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handlePrescriptionUpload}
                        required
                        style={styles.formControl}
                      />
                    </Form.Group>
                  )}

                  <Form.Group controlId="paymentMethod">
                    <Form.Label>Select Payment Method</Form.Label>
                    <Form.Select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                      style={styles.formControl}
                    >
                      <option value="cod">Cash on Delivery</option>
                      <option value="online">Online Payment</option>
                    </Form.Select>
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button} 
                    disabled={loading}
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Place Order'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CheckoutScreen;
