import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";
import ProtectedRoute from "./ProtectedRoute";
import PageA from "./PageA";
import PageB from "./PageB";
import Signup from "./Signup";
import { CartProvider } from "./cartContext";
import ProfilePage from "./ProfilePage";
import ProductDetail from "./ProductDetail";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import OrdersPage from "./OrdersPage";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Failed to read user from localStorage", e);
      return null;
    }
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/sales_inventory" replace /> : <Login />}
            />
            <Route
              path="/sales_inventory"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/choose" element={<HomePage />} />
            <Route path="/pageA" element={<PageA />} />
            <Route path="/pageB" element={<PageB />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserContext.Provider>
  );
}

export default App;

