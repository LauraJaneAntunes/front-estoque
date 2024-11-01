import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';

interface DashboardProps {
  products: {
    id: number;
    name: string;
    description: string;
    price: number;
  }[];
}

const Dashboard: React.FC<DashboardProps> = ({ products }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} /> {/* Passa a função de logout para a Navbar */}
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="dashboard-actions">
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

export default Dashboard;
