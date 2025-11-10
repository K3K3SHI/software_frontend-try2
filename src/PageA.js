import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "./PageA.css";
import Header from "./Header";

function PageA() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");


useEffect(() => {
  const fetchProducts = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("No user email found. Please log in again!");
      return;
    }
    try {
      const res = await axios.get("http://localhost:5000/filter_products", {
        params: { email }
      });
      if (res.data && res.data.products) {
        setProducts(res.data.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("Failed to fetch products");
    }
  };

  fetchProducts();
}, []);
 

  // Add new product
  const handleAddProduct = async () => {
    if (!name || !details || !image) {
      alert("Fill all fields!");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must be logged in!");
      return;
    }
    const sellerEmail = localStorage.getItem("userEmail");
    if (!sellerEmail) {
      alert("No user email found. Please log in again!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("details", details);
    formData.append("seller_id", sellerEmail);
    formData.append("image", image); // file object
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("brand", brand);
    formData.append("color", color);

    try {
      const res = await axios.post("http://localhost:5000/products", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data && res.data.product) {
        setProducts(prevProducts => [...prevProducts, res.data.product]);
      }
      setShowForm(false);
      setName("");
      setDetails("");
      setImage(null);
      setPrice("");
      setCategory("");
      setStock("");
      setBrand("");
      setColor("");
      alert("Product added successfully!");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    }
  };

   return (
    <div className="pageA-wrapper">
      <Header />
      <br></br>
      <br></br>
      <h2>My Product Listing</h2>
      <br></br>
      <div className="product-grid">
        {products.map((p, idx) => (
          <div className="product-card" key={idx}>
            {/* CHANGED: Use proper backend image URL */}
            <img src={`http://localhost:5000${p.image}`} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.details}</p>
          </div>
        ))}
      </div>
      <button className="add-button" onClick={() => setShowForm(true)}>+</button>
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Details</Form.Label>
              <Form.Control
                type="text"
                value={details}
                onChange={e => setDetails(e.target.value)}
              />
            </Form.Group>
            {/* CHANGED: File upload input */}
            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={e => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Product Price (₹)</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              min="0"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              value={stock}
              onChange={e => setStock(e.target.value)}
              min="0"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              value={brand}
              onChange={e => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              value={color}
              onChange={e => setColor(e.target.value)}
            />
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddProduct}>Add Product</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PageA;
