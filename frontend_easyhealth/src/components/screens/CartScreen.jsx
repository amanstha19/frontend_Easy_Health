import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ListGroup, Row, Col, Image, Card } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';

const CartScreen = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // Destructure updateQuantity from useCart
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/checkout'); // Navigate to checkout page
  };

  // Calculate total price, ensure cartItems is an array
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const increaseQuantity = (id) => {
    updateQuantity(id, 'increase');
  };

  const decreaseQuantity = (id) => {
    updateQuantity(id, 'decrease');
  };

  return (
    <div>
      <h1>Your Cart</h1>
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
                <Col md={3}>
                  <h5>{item.name}</h5>
                </Col>
                <Col md={2}>
                  <h5>NRP {item.price.toLocaleString()}</h5>
                </Col>
                <Col md={2}>
                  <div>
                    <Button variant="secondary" onClick={() => decreaseQuantity(item.id)}>-</Button>
                    <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                    <Button variant="secondary" onClick={() => increaseQuantity(item.id)}>+</Button>
                  </div>
                </Col>
                <Col md={2}>
                  <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                    <i className="bi bi-trash"></i> Remove
                  </Button>
                </Col>
                <Col md={1}>
                  {item.prescriptionRequired && <p>Prescription Required</p>}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {cartItems.length > 0 && (
        <Card>
          <Card.Body>
            <Row>
              <Col md={9}>
                <h4>Total Price:</h4>
              </Col>
              <Col md={3}>
                <h4>NRP {totalPrice.toLocaleString()}</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="primary" className="btn-block" onClick={checkoutHandler}>
                  Proceed to Checkout
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default CartScreen;
