import React, { useEffect } from "react";
import Navbar from "./components/Navbar"; // Ensure correct import path
import { Container } from "react-bootstrap";
import Footer from "./components/Footer"; // Ensure this path is correct
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import { testAPI } from './utils/api'; // Assuming the testAPI function is located in utils/api

function App() {
  useEffect(() => {
    // Call the API when the component mounts
    testAPI();
  }, []);

  return (
    <div>
      <Navbar />
      <Container>Welcome</Container>
      <Footer />
    </div>
  );
}

export default App;
