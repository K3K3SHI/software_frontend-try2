import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import "./Login.css";
import { Link } from "react-router-dom";


function Login() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // if user already exists (e.g. after refresh) immediately go to sales page
  useEffect( () => {

    if (user) navigate("/sales_inventory", { replace: true });

  }, [user, navigate] );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Fill in the fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // adapt keys to match your backend API
        body: JSON.stringify({ user_name: email, password }),
      });

      // parse response safely
      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        // not JSON
        throw new Error("Invalid server response");
      }

      if (!response.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      // backend must return something like { status: "OK", user: { ... } }
      if (data.status === "OK") {
        const userData = { email, ...(data.user || {}) };
        // save in context + localStorage
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userEmail", userData.email);
        setMessage("Login successful!");
        navigate("/sales_inventory", { replace: true });
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error: " + (err.message || err));
    }
  };

  return (
    <div className="Panel">
      <div className="box">
        <h2> LOGIN </h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="form-row align-end">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <br />

          <Form.Group controlId="formPassword" className="form-row align-end mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <br />

          <div className="button-center-wrapper">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>

        <p className="link">
            Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

      </div>
    </div>
  );
}
export default Login;