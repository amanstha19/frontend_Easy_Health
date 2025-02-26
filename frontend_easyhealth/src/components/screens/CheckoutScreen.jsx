import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, ListGroup, Image, Card, Spinner } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EsewaPayment from '../screens/Payment';  // Import the EsewaPayment component

const CheckoutScreen = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [prescriptionRequired, setPrescriptionRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showEsewaPayment, setShowEsewaPayment] = useState(false);

  useEffect(() => {
    const requiresPrescription = cartItems.some(item => item.prescriptionRequired);
    setPrescriptionRequired(requiresPrescription);

    // Calculate total price from cart items
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handlePrescriptionUpload = (e) => {
    setPrescription(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before proceeding to checkout.');
      return;
    }

    if (prescriptionRequired && !prescription) {
      alert('Please upload your prescription.');
      return;
    }

    if (!address.trim()) {
      alert('Please enter a delivery address.');
      return;
    }

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

      const formData = new FormData();
      formData.append('address', address);
      formData.append('payment_method', paymentMethod);
      if (prescriptionRequired) {
        formData.append('prescription', prescription);
      }
      formData.append('cart_items', JSON.stringify(cartItems));

      const response = await axios.post('http://localhost:8000/api/order/place/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (paymentMethod === 'online') {
        // First, ensure stock is reduced by placing the order
        setShowEsewaPayment(true);
        return;
      }

      navigate(`/order-success/${response.data.order_id}`);

    } catch (error) {
      console.error('Error during checkout:', error);
      alert('There was an error processing your checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showEsewaPayment) {
    return <EsewaPayment totalPrice={totalPrice} />;
  }

  return (
    <div style={{ backgroundColor: '#d3f8d3', minHeight: '100vh', padding: '20px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 className="text-center mb-4" style={{ color: '#2c6b2f', fontWeight: 'bold' }}>Checkout</h1>
        <Row>
          <Col md={8}>
            <Card className="mb-4">
              <Card.Body>
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
                <div className="mt-3">
                  <strong>Total Price: NPR {totalPrice}</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Delivery Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your delivery address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {prescriptionRequired && (
                    <Form.Group className="mb-3">
                      <Form.Label>Upload Prescription</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handlePrescriptionUpload}
                        required
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Select Payment Method</Form.Label>
                    <Form.Select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    >
                      <option value="cod">Cash on Delivery</option>
                      <option value="online">Online Payment (eSewa)</option>
                    </Form.Select>
                  </Form.Group>

                  <Button 
                    type="submit" 
                    className="w-100"
                    disabled={loading}
                    variant="success"
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
