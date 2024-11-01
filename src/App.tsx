import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ProductList from './components/ProductList/ProductList';
import ProductForm from './components/ProductForm/ProductForm';
import Register from './components/Register/Register';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);

  const handleLogin = () => setIsLoggedIn(true);

  const API_URL = process.env.REACT_APP_API_URL; 

  useEffect(() => {
    const fetchProducts = async () => {
      if (isLoggedIn) {
        try {
          const response = await fetch(`${API_URL}/api/produtos`);
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
        }
      }
    };

    fetchProducts();
  }, [isLoggedIn, API_URL]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/usuarios/cadastro" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard products={products} />} />
        <Route path="/produtos" element={<ProductList products={products} />} />
        <Route path="/produtos/adicionar" element={<ProductForm />} />
        <Route path="/produtos/editar/:id" element={<ProductForm />} />
      </Routes>
    </Router>
  );
};

export default App;
