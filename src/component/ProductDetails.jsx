import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./CartContext";
import CartSidebar from "./CartSidebar";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-24 px-6 grid md:grid-cols-2 gap-10 items-start relative">
      <div className="flex justify-start">
        <img
          src={product.image}
          alt={product.title}
          className="w-96 h-96 object-contain rounded-lg shadow-md"
        />
      </div>

      <div className="text-left">
        <h1 className="text-3xl font-bold mb-3 text-gray-800">{product.title}</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
        <p className="text-blue-600 font-bold text-2xl mb-8">${product.price}</p>
        <button
          onClick={() => {
            addToCart(product);
            setIsCartOpen(true);
          }}
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition font-medium"
        >
          Add to Cart
        </button>
      </div>

      {/* Sidebar */}
      <CartSidebar open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default ProductDetails;
