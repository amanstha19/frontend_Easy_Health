import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { testAPI } from './utils/api';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Login from './components/screens/Login';
import SignupScreen from './components/screens/SignupScreen';
import HomeScreen from "./components/screens/HomeScreen";
import Product from "./components/product";

function App() {
  useEffect(() => {
    testAPI();
  }, []);

  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
        </Routes>
        <Routes>
          <Route exact path="/product/:id" element={<Product />} />
        </Routes>
        <Routes>
          <Route exact path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route exact path="/signup" element={<SignupScreen />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
