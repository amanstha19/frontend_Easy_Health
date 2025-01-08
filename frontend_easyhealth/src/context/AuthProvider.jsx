// src/context/AuthProvider.jsx
import React, { createContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);  // Store the logged-in user

  const signup = async ({ username, email, password }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        username,
        email,
        password,
        
      });
      console.log('User registered:', response.data);
      setUser(response.data.user); // Save user info after registration
      setError(null); // Clear error
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred');
    }
  };

  const login = async ({ username, password }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      // Assume response contains a token and possibly user information
      setUser({
        username: response.data.username, // Ensure this matches the actual API response
        // Add other user properties if available
      });
      setError(null); // Clear error
      return Promise.resolve(); // Return success to resolve the login process
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      return Promise.reject(err); // Reject in case of error
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authTokens'); // Clear user info on logout
  };

  return (
    <AuthContext.Provider value={{ user, error, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
