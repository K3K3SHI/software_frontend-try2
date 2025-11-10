import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import buyImage from "./assets/buy.jpg";
import saleImage from "./assets/sale.jpg";
import "./HomePage.css";
import { Link } from "react-router-dom";

import Header from "./Header";

function HomePage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();



  return (
    <div className="homepage-wrapper">
      <Header/>

      {/* Hero */}
      <div className="hero-banner">
        <h2>Welcome to CommunityKart</h2>
        <p>Discover amazing products and exclusive deals.</p>
        <button className="shop-now-btn">Shop Now</button>
      </div>

      {}
      <div className="image-container">
        <div className="image-block" onClick={() => navigate("/pageA")}>
          <img src={buyImage} alt="Buy" className="image-card" />
          <p>Browse Products</p>
        </div>

        <div className="image-block" onClick={() => navigate("/pageB")}>
          <img src={saleImage} alt="Sale" className="image-card" />
          <p>List Your Products</p>
        </div>
      </div>

      <div className="widgets">
        <div className="widget">🛒 Orders</div>
        <div className="widget">❤️ Favorites</div>
        <div className="widget">💬 Messages</div>
        <div className="widget">👤 Profile</div>
      </div>

      {user ? <p> {user.email}</p> : <p>You are not logged in.</p>}

      <div className="footer">
        <p>&copy; 2025 MyStore. All rights reserved.</p>
      </div>

    </div>

  );
}

export default HomePage;
