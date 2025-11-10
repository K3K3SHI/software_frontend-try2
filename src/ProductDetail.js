import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useCart } from "./cartContext";
import Header from "./Header";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://flaskbackend-try2-production.up.railway.app/product/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data.product))
      .catch(err => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return (
      <div className="product-detail-loading">
        <div className="spinner"></div>
        <span>Loading product details...</span>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <Header></Header>
      <div className="product-detail-card">
        <div className="product-image-section">
          <img
            src={`https://flaskbackend-try2-production.up.railway.app${product.image}`}
            alt={product.name}
            className="product-image-large"
          />
        </div>
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-desc">{product.details}</p>
          <div className="product-meta">
            <span className="product-price">₹{product.price}</span>
            <span className="product-category">{product.category}</span>
            <span className="product-brand">Brand: {product.brand}</span>
            <span className="product-color">Color: {product.color}</span>
            <span className="product-stock">Stock: {product.stock}</span>
            <span className="product-seller">Sold by: {product.seller_id || "Unknown seller"}</span>
          </div>
          <div className="product-actions">
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <button className="buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
