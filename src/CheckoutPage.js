import React, { useState } from "react";
import { useCart } from "./cartContext";
import Header from "./Header";
import StripeCheckout from "./StripeCheckout"; // No curly braces!

function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [orderComplete, setOrderComplete] = useState(false);
  const [error, setError] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  async function handlePlaceOrderAfterPayment() {
    const user = localStorage.getItem("userEmail"); // or adjust as per your user logic
    if (!user) {
      setError("You must be logged in.");
      return;
    }
    const response = await fetch("https://flask-backend-production-ada1.up.railway.app/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user,
        address,
        items: cart,
        total_price: total
      })
    });
    if (response.ok) {
      setOrderComplete(true);
      clearCart();
    } else {
      const resData = await response.json();
      setError(resData?.error || "Order failed.");
    }
  }

  if (orderComplete) {
    return (
      <div style={{ maxWidth: 500, margin: "40px auto", padding: 24 }}>
        <h2>Order Confirmed!</h2>
        <p>Thank you for your purchase.</p>
        <a href="/"><button>Go back to Shop</button></a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 24 }}>
      <Header />
      <br/>
      <h2>Checkout</h2>
      {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
      {!showPayment ? (
        <form onSubmit={e => { e.preventDefault(); setShowPayment(true); }}>
          <div style={{ marginBottom: 16 }}>
            <label>
              Address: <br />
              <textarea value={address} onChange={e => setAddress(e.target.value)} required
                style={{ width: "100%" }} />
            </label>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>
              Phone: <br />
              <input value={phone} onChange={e => setPhone(e.target.value)} required
                type="tel" style={{ width: "100%" }} />
            </label>
          </div>
          <div style={{ marginBottom: 16 }}>
            <h4>Order Summary</h4>
            <ul>
              {cart.map(item => (
                <li key={item.id}>{item.name} x {item.quantity} — ₹{item.price * item.quantity}</li>
              ))}
            </ul>
            <div><b>Total:</b> ₹{total}</div>
          </div>
          <button style={{ background: "#1976d2", color: "#fff", border: "none", borderRadius: 6, padding: "11px 28px" }}>
            Proceed to Payment
          </button>
        </form>
      ) : (
        <StripeCheckout total={total} onPaymentSuccess={handlePlaceOrderAfterPayment} />
      )}
    </div>
  );
}

export default CheckoutPage;
