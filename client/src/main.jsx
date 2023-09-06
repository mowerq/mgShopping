import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Login from "../src/components/login/Signin.jsx";
import Cart from "../src/components/cart/Cart.jsx";
import CategorySearch from "./components/category-search/CategorySearch.jsx";
import "./index.css";
import Product from "./components/product/Product.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories/:category" element={<CategorySearch />} />
        <Route path="/product/:productid" element={<Product />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
