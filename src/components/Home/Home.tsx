import React from 'react';
import { useNavigate } from 'react-router-dom';
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

        </div>
        <h2>Lista de Produtos</h2>

      </div>
    </div>
  );
};

export default Home;
