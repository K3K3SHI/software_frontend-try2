import React, { useState, useEffect } from "react";
import "./PageA.css";
import Header from "./Header";
//import { Link } from "react-router-dom";
const PageB = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from Flask backend
  useEffect(() => {
    fetch("https://flask-backend-production-ada1.up.railway.app/productlist")
      .then((res) => res.json())
      .then((data) => setProducts(data.product))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="pageA-wrapper">
      <Header />
      <br></br>
      <br></br>
      <h2 className="section-title">Available Products</h2>
      <br></br>
      <div className="products-grid">
        {products.map((product, index) => (
          <div className="product-card" key={product.id || index}>
            <div className="product-image-wrapper">
              <img
                src={`https://flask-backend-production-ada1.up.railway.app${product.image}`}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-details">{product.details}</p>
              <div className="product-meta">
                <span className="product-price">₹{product.price}</span>
                <span className="product-category">{product.category}</span>
                <span className="product-brand">{product.brand}</span>
              </div>
              <button className="product-btn" onClick={() => window.location.href = `/product/${product.id}`}>View Details</button>
            </div>
          </div>
  ))}
</div>

    </div>
  );
};

export default PageB;
