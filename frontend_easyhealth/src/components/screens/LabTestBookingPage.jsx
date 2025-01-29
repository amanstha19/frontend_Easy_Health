import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

// Utility to get the CSRF token
const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const LabTestBookingPage = () => {
  const [activeTab, setActiveTab] = useState('booking');
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    email: '',
    service: '',
    booking_date: '',
    appointment_time: '',
    address: '',
    notes: '',
    agreedToTerms: false,
  });

  const [statusCheck, setStatusCheck] = useState({
    email: '',
    mobile_number: ''
  });

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [reports, setReports] = useState([]);

  const api = axios.create({
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/api/services/');
      setServices(response.data);
    } catch (err) {
      setError(`Failed to fetch services: ${err.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleStatusCheckChange = (e) => {
    const { name, value } = e.target;
    setStatusCheck((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const submitData = {
      ...formData,
      service: parseInt(formData.service),
    };
    delete submitData.agreedToTerms;

    try {
      await api.post('/api/bookings/', submitData);
      setSuccess(true);
      setFormData({
        name: '',
        mobile_number: '',
        email: '',
        service: '',
        booking_date: '',
        appointment_time: '',
        address: '',
        notes: '',
        agreedToTerms: false
      });
    } catch (err) {
      if (err.response?.data?.error === 'This time slot is already booked') {
        setError('The selected time slot is already booked. Please choose another time.');
      } else {
        setError(err.response?.data?.error || 'Failed to create booking');
      }
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBookingStatus(null);
    setReports([]);

    try {
      const response = await api.post('/api/bookings/status/', statusCheck);
      const { booking, reports } = response.data;
      setBookingStatus(booking);
      setReports(reports);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch booking status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <div className="mb-4">
        <Button
          variant={activeTab === 'booking' ? 'primary' : 'outline-primary'}
          className="me-2"
          onClick={() => setActiveTab('booking')}
        >
          Book Appointment
        </Button>
        <Button
          variant={activeTab === 'status' ? 'primary' : 'outline-primary'}
          onClick={() => setActiveTab('status')}
        >
          Check Status
        </Button>
      </div>

      {activeTab === 'booking' ? (
        <>
          <h2 className="text-center mb-4">Book an Appointment</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Booking submitted successfully!</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Service</Form.Label>
              <Form.Control
                as="select"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Booking Date</Form.Label>
              <Form.Control
                type="date"
                name="booking_date"
                value={formData.booking_date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Appointment Time</Form.Label>
              <Form.Control
                type="time"
                name="appointment_time"
                value={formData.appointment_time}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="I agree to the terms and conditions"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={loading || !formData.agreedToTerms}
            >
              {loading ? 'Submitting...' : 'Book Appointment'}
            </Button>
          </Form>
        </>
      ) : (
        <>
          <h2 className="text-center mb-4">Check Appointment Status</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={checkStatus} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={statusCheck.email}
                onChange={handleStatusCheckChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobile_number"
                value={statusCheck.mobile_number}
                onChange={handleStatusCheckChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Checking...' : 'Check Status'}
            </Button>
          </Form>

          {bookingStatus && <Card>
            <Card.Body>
              <h5>Status: {bookingStatus.status}</h5>
              <p>Booked Date: {bookingStatus.booking_date}</p>
            </Card.Body>
          </Card>}

          {reports.length > 0 && (
            <div>
              <h3>Reports</h3>
              <ul>
                {reports.map((report, index) => (
                  <li key={index}>{report.name}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default LabTestBookingPage;
