// src/App.js
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar'; // Ensure correct import path
import Footer from './components/Footer'; // Ensure correct import path
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome Icons
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
import { testAPI } from './utils/api'; // Assuming the testAPI function is located in utils/api
import Login from './components/screens/Login'; // Adjust path if needed
import SignupScreen from './components/screens/SignupScreen'; // Adjust path if needed
import HomeScreen from './components/screens/HomeScreen'; // Corrected relative path
import ProductScreen from './components/screens/ProductScreen'; // Ensure this matches
import Ambulance from './components/screens/Ambulance'; // Ensure this matches
import { AuthProvider } from './context/AuthProvider'; // Import AuthProvider



function App() {
  useEffect(() => {
    // Call the API when the component mounts
    testAPI();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/signin" element={<Login />} /> {/* Add the /signin route */}
            <Route path="/ambulance" element={<Ambulance />} />
          
            
          </Routes>
        </Container>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
