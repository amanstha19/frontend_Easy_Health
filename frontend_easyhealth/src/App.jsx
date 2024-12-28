import React, { useEffect } from "react"; // Import useEffect
import Navbar from "./components/Navbar"; // Ensure correct import path
import { Container } from "react-bootstrap";
import Footer from "./components/Footer"; // Ensure this path is correct
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import { testAPI } from './utils/api'; // Assuming the testAPI function is located in utils/api
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router components

import Features from './components/screens/Features'; // Corrected relative path
import Login from './components/screens/Login'; // Adjust path if needed
import SignupScreen from './components/screens/SignupScreen'; // Adjust path if needed
import Cart from './components/screens/Cart'
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
          {/* Define Routes */}
          <Route exact path="/" element={<div>HomeScreen</div>} />
          <Route exact path="/features" element={<Features />} />
          <Route exact path="/cart" element={<Cart Page/>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignupScreen />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
