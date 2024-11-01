// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/images/logo.png'

interface NavbarProps {
  onLogout: () => void; 
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
        <ul className="navbar-links">
          <li><Link to="/produtos" className="navbar-link">Produtos</Link></li>
          <li><Link to="/usuarios" className="navbar-link">Usuários</Link></li>
          <li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li>
          <li>
            <button className="logout-button" onClick={onLogout}>Sair</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
