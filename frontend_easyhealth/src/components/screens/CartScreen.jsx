import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ListGroup, Row, Col, Image, Card } from 'react-bootstrap';
import { useCart } from '../../context/CartContext'; // Import useCart hook

const CartScreen = () => {
  const { cartItems, removeFromCart } = useCart(); // Destructure cartItems and removeFromCart
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/checkout'); // Navigate to checkout page
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
                  {/* Ensure item.image is correct and prepend the base URL if needed */}
                  <Image src={`http://127.0.0.1:8000${item.image}`} alt={item.name} fluid />
                </Col>
                <Col md={3}>
                  <h5>{item.name}</h5>
                </Col>
                <Col md={3}>
                  <h5>NRP{item.price}</h5>
                </Col>
                <Col md={2}>
                  <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                    <i className="bi bi-trash"></i> Remove
                  </Button>
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
              <Col>
                <Button
                  variant="primary"
                  className="btn-block"
                  onClick={checkoutHandler}
                >
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
