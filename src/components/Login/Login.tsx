import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import imgLogin from '../../assets/images/imgLogin.gif';
import axios from 'axios';
import './Login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'O e-mail deve ser válido.';
    }
    
    if (!password) {
      newErrors.password = 'A senha é obrigatória.';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return; // Se houver erros de validação, não prosseguir
    }

    try {
      const response = await axios.post('http://localhost:5000/api/usuarios/login', {
        email,
        password,
      });

      // Se o login for bem-sucedido, chama onLogin e redireciona para a página de home
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token); 
        onLogin(); // Chama a função onLogin passada como prop
        navigate('/home'); // Redireciona para a página home
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Falha ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="login-title">Faça seu login</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="label">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seuemail@email.com"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>} {/* Exibe erro se houver */}
          </div>
          <div>
            <label htmlFor="password" className="label">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="sua senha"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error">{errors.password}</span>} {/* Exibe erro se houver */}
          </div>
          <div className="checkbox-container">
            <div>
              <label className="checkbox-label">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-700">Lembrar de mim</span>
              </label>
            </div>
            <div>
              <Link to="/usuarios/cadastro" className="link">Cadastre-se</Link>
            </div>
          </div>
          <button type="submit" className="submit-button">Entrar</button>
        </form>
      </div>
      <div className="image-container">
        <div className="image">
          <img src={imgLogin} alt="Background" className="background-image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
