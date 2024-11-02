import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Home.css';
import { Edit2, Trash2 } from 'lucide-react';

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/produtos');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = { name, description, price: parseFloat(price), quantity, image };

    try {
      const response = await fetch('http://localhost:5000/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setProducts((prevProducts) => [...prevProducts, addedProduct]);

        setName('');
        setDescription('');
        setPrice('');
        setQuantity(0);
        setImage(null);
      } else {
        console.error('Erro ao adicionar produto');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="outer-container">
      <Navbar onLogout={handleLogout} />
      <div className="home-container">
        <h2>Lista de Produtos</h2>
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              {product.image ? (
                <img src={product.image} alt={product.name} className="product-image" />
              ) : (
                <div className="placeholder-image" />
              )}
              <span className="product-name">{product.name}</span>
              <span className="product-description">{product.description}</span>
              <span className="product-price">R${product.price.toFixed(2)}</span>
              <span className="product-quantity">{product.quantity}</span>
              <span className="product-actions">
              <button>
                  <Edit2 size={16} /> {/* Ícone de editar */}
                </button>
                <button>
                  <Trash2 size={16} /> {/* Ícone de excluir */}
                </button>
              </span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <hr className="divider" />

        <div className="product-form">
          <h2>Adicionar Produto</h2>
          <form onSubmit={handleAddProduct} className="form-inline">
            <div className="form-group">
              <label htmlFor="name">Nome do Produto:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição:</label>
              <textarea
                id="description"
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group small-input">
              <label htmlFor="quantity">Quantidade:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
            </div>
            <div className="form-group small-input">
              <label htmlFor="price">Preço:</label>
              <input
                type="text"
                id="price"
                placeholder='99.99'
                value={price}
                onChange={handlePriceChange}
                required
              />
            </div>
            
          </form>
          <div className="form-group">
              <label htmlFor="image">Imagem:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              />
            </div>
            <button type="submit" className="button">Adicionar Produto</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
