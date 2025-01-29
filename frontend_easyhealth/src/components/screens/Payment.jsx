import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Button, Form, Card, Spinner } from 'react-bootstrap';

const PaymentScreen = () => {
  const { orderId, totalPrice } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/payment-intent/', {
        amount: totalPrice,
        order_id: orderId,
      });

      const clientSecret = response.data.client_secret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          navigate(`/order-success/${orderId}`);
        }
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-5 p-3">
      <Card.Body>
        <h2>Payment for Order #{orderId}</h2>
        <p>Total Amount: NPR {totalPrice}</p>
        <Form onSubmit={handlePayment}>
          <CardElement className="p-3 border rounded" />
          {error && <p className="text-danger mt-3">{error}</p>}
          <Button type="submit" className="mt-3 w-100" disabled={!stripe || loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Pay Now'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PaymentScreen;
