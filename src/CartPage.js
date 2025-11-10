import React from "react";
import { useCart } from "./cartContext";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./CartPage.css"; // <-- Import the CSS file with styles below

function CartPage() {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <Header />
      <div className="cart-header-row">
        <h2>Your Cart</h2>
        <button className="empty-cart-btn" onClick={clearCart}>
          Empty Cart
        </button>
      </div>
      {cart.length === 0 ? (
        <p style={{ color: "#888", margin: "38px 0" }}>Your cart is empty.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price&nbsp;(₹)</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <button className="qty-btn" onClick={() => decrementQuantity(item.id)}>-</button>
                  <span style={{ margin: "0 8px" }}>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => incrementQuantity(item.id)}>+</button>
                </td>
                <td>{item.price}</td>
                <td>{item.price * item.quantity}</td>
                <td>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="cart-total-row">
              <td colSpan={3} style={{ textAlign: "right" }}>Total:</td>
              <td colSpan={2} style={{ textAlign: "left" }}>₹{total}</td>
            </tr>
          </tfoot>
        </table>
      )}
      <div className="checkout-area">
        <Link to="/checkout">
          <button className="checkout-btn">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
