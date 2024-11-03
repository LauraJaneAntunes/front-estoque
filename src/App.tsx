import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import EditProduct from './components/Products/EditProduct';

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
          console.log("Response:", response); // Adicione este log para inspecionar a resposta
          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
          }
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
        <Route path="/home" element={<Home/>} />
        <Route path="/products/edit/:id" element={<EditProduct />} /> 
      </Routes>
    </Router>
  );
};

export default App;
