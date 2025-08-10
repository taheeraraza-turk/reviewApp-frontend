import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import '../styles/products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(data => {
    
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);


  if (loading) return <Loader />;

  return (
    <div className="products-container">
      {products.map(p => (
        <Link
          to={`/products/${p._id}`}
          key={p._id}
          className="product-card"
        >
          <img
            src={p.image}
            alt={p.title}
            className="product-image"
          />
          <div className="product-info">
            <h2 className="product-title">{p.title}</h2>
            <p className="product-description">{p.description}</p>
            <p className="product-price">${p.price.toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
