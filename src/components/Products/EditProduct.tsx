import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Estados para os campos do formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    // Lógica para buscar os detalhes do produto
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/produtos/${id}`);
        const data = await response.json();
        setProduct(data);
        setName(data.name); // Preenche os campos do formulário com os dados do produto
        setDescription(data.description);
        setPrice(data.price);
        setQuantity(data.quantity);
      } catch (error) {
        console.error('Erro ao buscar o produto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(',', '.'); // Permite que a vírgula seja usada como separador decimal
    setPrice(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevê o comportamento padrão do formulário
  
    const updatedProduct = { name, description, price, quantity };
  
    // Se uma nova imagem foi selecionada, você pode precisar enviar também
    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('description', updatedProduct.description);
    formData.append('price', updatedProduct.price);
    formData.append('quantity', updatedProduct.quantity.toString()); // Converte quantity para string
  
    if (image) {
      formData.append('image', image); // Adiciona a imagem se disponível
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/produtos/${id}`, {
        method: 'PUT',
        body: formData, // Envia o FormData
      });
  
      if (!response.ok) {
        throw new Error('Erro ao atualizar o produto');
      }
  
      // Opção: se a atualização for bem-sucedida, redirecione ou atualize a interface
      navigate('/'); // Redireciona após salvar
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="outer-container">
      <Navbar onLogout={handleLogout} />
      <div className="register-container">
        <h2>Editar Produto</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="form-group">
            <label htmlFor="image">Imagem:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
