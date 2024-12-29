// src/utils/api.js

import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:8000/api/',  
});

export default API 


export const testAPI = async () => {
  try {
    const response = await API.get('test/');
    console.log(response.data); 
  } catch (error) {
    console.error("Error connecting to Django API", error);
  }
};
