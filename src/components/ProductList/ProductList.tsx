import React from 'react';
import './ProductList.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const handleEdit = (id: number) => {
    console.log(`Editar produto com ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Remover produto com ID: ${id}`);
  };

  return (
    <ul className="product-list">
      {products.map(product => (
        <li key={product.id} className="product-item">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">R$ {product.price.toFixed(2)}</p>
          {/* Botões para editar e remover */}
          <button onClick={() => handleEdit(product.id)}>Editar</button>
          <button onClick={() => handleDelete(product.id)}>Remover</button>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
