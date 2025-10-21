import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import ProductList from "./component/ProductList";
import ProductDetails from "./component/ProductDetails";
import Navbar from "./component/Navbar";
import CartSidebar from "./component/CartSidebar";
import { CartProvider, useCart } from "./component/CartContext";

const AppContent = () => {
  const { setIsCartOpen } = useCart();

  return (
    <>
      {/* Navbar with Cart Button */}
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* Global Cart Sidebar */}
      <CartSidebar />

      {/* Routes */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
};

export default App;
