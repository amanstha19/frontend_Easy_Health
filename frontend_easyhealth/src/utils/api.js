// src/utils/api.js

import axios from 'axios';

// Set the base URL to your Django API (ensure this is the correct path)
const API = axios.create({
  baseURL: 'http://localhost:8000/api/',  // Django's server URL
});

// Make a test request
export const testAPI = async () => {
  try {
    const response = await API.get('test/');
    console.log(response.data);  // Should log { message: 'Hello from Django!' }
  } catch (error) {
    console.error("Error connecting to Django API", error);
  }
};
