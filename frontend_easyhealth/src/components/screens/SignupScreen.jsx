import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../src/context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signup, error, setError } = useContext(AuthContext); // Ensure 'setError' is available if needed
  const navigate = useNavigate();

  // Check email uniqueness via backend API
  const checkEmailUniqueness = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/check-email/', { email });
      if (response.data.message === 'Email is available.') {
        setEmailError('');
        return true;
      } else {
        setEmailError(response.data.error || 'This email is already registered.');
        return false;
      }
    } catch (err) {
      if (err.response) {
        console.error('Error response:', err.response.data);
        setEmailError(err.response.data.error || 'Error checking email uniqueness. Please try again.');
      } else {
        console.error('Error:', err.message);
        setEmailError('Error checking email uniqueness. Please try again.');
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email is unique
    if (!await checkEmailUniqueness()) return;

    // Validate password format
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password should be at least 8 characters long and contain at least 1 special character.');
      return;
    }

    setPasswordError('');

    // Proceed with signup if all checks are successful
    signup({ email, password, username, firstName, lastName, city, phone })
      .then(() => {
        navigate('/signin');
      })
      .catch((err) => {
        console.error('Signup error:', err);
        setError('Signup failed. Please try again.'); // Display a general error message
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="p-4 rounded shadow-sm" style={{ backgroundColor: '#d4edda' }}>
            <h2 className="text-center mb-4">Signup</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                {emailError && <div className="text-danger mt-2">{emailError}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                {passwordError && <div className="text-danger mt-2">{passwordError}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter your city"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>
            {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
