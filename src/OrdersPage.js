import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./OrdersPage.css";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("userEmail");
    if (!user) {
      setError("Please login to view your orders.");
      setLoading(false);
      return;
    }
    fetch(`http://localhost:5000/orders_get?user_id=${user}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load orders.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="orders-bg">
      <Header />
      <div className="orders-main">
        <h2 style={{ textAlign: "center", marginBottom: 28 }}>Your Orders</h2>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && orders.length === 0 && !error && (
          <div className="orders-empty">No orders yet.</div>
        )}

        <div className="orders-cards">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-status-box">
                
              </div>
              <div className="order-card-row">
                <span className="order-date">
                  {new Date(order.order_time).toLocaleString()}
                </span>
                <span className="order-total">₹{order.total_price}</span>
              </div>
              <div className="order-address"><b>Address:</b> {order.address}</div>
              <div className="order-itemslist">
                <b>Items:</b>
                <ul>
                  {JSON.parse(order.items).map(item => (
                    <li key={item.id}>
                      {item.name} x {item.quantity} — ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
