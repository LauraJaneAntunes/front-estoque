import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!name || name.length < 3) {
      newErrors.name = 'O nome do usuário é obrigatório e deve conter pelo menos 3 caracteres.';
    }
    
    if (!email) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'O e-mail deve ser válido.';
    }
    
    if (!password || password.length < 6) {
      newErrors.password = 'A senha é obrigatória e deve ter no mínimo 6 caracteres.';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@#$%^&*!?-])[A-Za-z\d_@#$%^&*!?-]+$/.test(password)) {
      newErrors.password = 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return; // Não envia o formulário se houver erros
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/usuarios/cadastrar', {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        alert('Usuário cadastrado com sucesso!');
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
            {errors.name && <span className="error-message">{errors.name}</span>}
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
            {errors.email && <span className="error-message">{errors.email}</span>}
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
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
