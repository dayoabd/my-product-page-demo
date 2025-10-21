import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import ProductDetails from "./component/ProductDetails";
import { CartProvider, useCart } from "./component/CartContext";
import Navbar from "./component/Navbar";
import CartSidebar from "./component/CartSidebar";

const AppContent = () => {
  const { setIsCartOpen } = useCart();

  return (
    <>
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartSidebar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
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
