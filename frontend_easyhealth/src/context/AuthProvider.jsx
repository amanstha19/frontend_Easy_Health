import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authTokens = sessionStorage.getItem('authTokens');
    if (authTokens) {
      const parsedTokens = JSON.parse(authTokens);
      setUser({
        username: parsedTokens.username,
        email: parsedTokens.email,
      });
    }
  }, []);

  const signup = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        email: userData.email,
        password: userData.password,
        username: userData.username,
        first_name: userData.firstName,
        last_name: userData.lastName,
      });
      setUser(response.data.user);
      sessionStorage.setItem('authTokens', JSON.stringify(response.data.tokens));
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed');
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', credentials);
      sessionStorage.setItem('authTokens', JSON.stringify(response.data)); 
      setUser({
        username: response.data.username,
        email: response.data.email,
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('authTokens');
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
