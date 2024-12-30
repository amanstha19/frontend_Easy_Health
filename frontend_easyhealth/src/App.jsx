import React, { useEffect } from "react"; // Import useEffect
import Navbar from "./components/Navbar"; // Ensure correct import path
import { Container } from "react-bootstrap";
import Footer from "./components/Footer"; // Ensure this path is correct
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome Icons
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
import { testAPI } from './utils/api'; // Assuming the testAPI function is located in utils/api
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router components

import Login from './components/screens/Login'; // Adjust path if needed
import SignupScreen from './components/screens/SignupScreen'; // Adjust path if needed
import HomeScreen from "./components/screens/HomeScreen"; // Corrected relative path
import Product from "./components/product"; // Corrected relative path

function App() {
  useEffect(() => {
    // Call the API when the component mounts
    testAPI();
  }, []);

  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignupScreen />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
