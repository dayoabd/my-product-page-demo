// src/component/Home.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import CartModal from "./CartModal";

const Home = () => {
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onCartClick={() => setShowCart(true)} />
      <main className="pt-20 px-4 md:px-10">
        <ProductList />
      </main>

      {showCart && <CartModal onClose={() => setShowCart(false)} />}
    </div>
  );
};

export default Home;
