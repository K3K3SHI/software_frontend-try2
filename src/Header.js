import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { useCart } from "./cartContext";             // <-- import useCart

function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { cart } = useCart();                       // <-- get cart context

  // Computes total quantity (all products)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <div className="header">
      <div className="logo">MyStore</div>
      <nav className="nav-menu">
        <Link to="/">Home</Link>
        <Link to="/pageA">Browse</Link>
        <Link to="/pageB">List Product</Link>
        <Link to="/orders">Order History</Link>
      </nav>
      <div className="header-icons">
        <Link className="cart-btn" to="/cart">
          🛒
          <span style={{
            display: "inline-block",
            background: "#1976d2",
            color: "#fff",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "0.9em",
            marginLeft: 4,
            minWidth: 20,
            textAlign: "center"
          }}>
            {cartCount}
          </span>
        </Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Header;
