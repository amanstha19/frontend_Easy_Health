// src/context/AuthProvider.jsx
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext } from 'react';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const signup = async ({ username, email, password, firstName, lastName }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName
      });
      console.log('User registered:', response.data);
      setUser(response.data.user);  // Assuming the response contains user data
      setError(null);  // Reset any previous errors
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
      
      // Save token to localStorage
      localStorage.setItem('authTokens', JSON.stringify(response.data));

      // Assuming the response contains user data
      setUser({
        username: response.data.username,
        email: response.data.email,
      });

      setError(null);  // Reset any errors
      return Promise.resolve();
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      return Promise.reject(err);
    }
  };

  const logout = () => {
    setUser(null);  // Clear user data on logout
    localStorage.removeItem('authTokens');  // Remove token from localStorage
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
