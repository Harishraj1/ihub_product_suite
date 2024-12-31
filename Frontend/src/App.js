import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Product_desc from './pages/Product_desc';

function App() {
  // Custom Layout component to manage Navbar and Footer
  const Layout = ({ children }) => {
    const location = useLocation();
    
    // Hide Navbar and Footer on specific paths
    
    const hideNavbarAndFooter = location.pathname === '/signup' || location.pathname === '/login';

    return (
      <>
        {!hideNavbarAndFooter && <Navbar />}
        {children}
        {!hideNavbarAndFooter && <Footer />}
      </>
    );
  };

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<Home />} />

          {/* Login Page Route */}
          <Route path="/login" element={<Login />} />

          {/* Signup Page Route */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product_desc/:id" element={<Product_desc />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;



