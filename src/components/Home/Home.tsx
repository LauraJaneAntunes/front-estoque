import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import Navbar from '../Navbar/Navbar';
import './Home.css';

interface HomeProps {
  products: {
    id: number;
    name: string;
    description: string;
    price: number;
  }[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} /> {/* Passa a função de logout para a Navbar */}
      <div className="home-container">
        <div className="home-actions">
          <Link to="/produtos/adicionar" className="add-product-button">
            Adicionar Produto
          </Link>
        </div>
        <h2>Lista de Produtos</h2>
        <ProductList products={products} /> {/* Passando a lista de produtos */}
      </div>
    </div>
  );
};

export default Home;
