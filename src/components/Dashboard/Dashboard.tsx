import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
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
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-actions">
        <Link to="/produtos/adicionar" className="add-product-button">
          Adicionar Produto
        </Link>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </div>
      <h2>Lista de Produtos</h2>
      <ProductList products={products} /> {/* Passando a lista de produtos */}
    </div>
  );
};

export default Dashboard;
