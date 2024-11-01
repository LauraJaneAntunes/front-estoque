import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('usuario');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/usuarios/cadastrar', {
        name,
        email,
        password,
        role: userRole,
      });

      if (response.status === 200) {
        alert('Usuário cadastrado com sucesso!');
        // Redireciona para a página de login após o registro
        navigate('/'); 
      } else {
        alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar usuário. Verifique se o email já está em uso ou entre em contato com o suporte.');
    }
  };

  return (
    <div className="container">
      <div className="register-container">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="divider"></div>
          <div className="form-group centered">
            <label >Função</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="usuario"
                  checked={userRole === 'usuario'}
                  onChange={(e) => setUserRole(e.target.value)}
                />
                Usuário
              </label>
              <label>
                <input
                  type="radio"
                  value="gerente"
                  checked={userRole === 'gerente'}
                  onChange={(e) => setUserRole(e.target.value)}
                />
                Gerente
              </label>
              <label>
                <input
                  type="radio"
                  value="administrador"
                  checked={userRole === 'administrador'}
                  onChange={(e) => setUserRole(e.target.value)}
                />
                Administrador
              </label>
            </div>
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
