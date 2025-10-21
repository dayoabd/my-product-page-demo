import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-24 px-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fadeIn"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationFillMode: "backwards",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-40 object-contain mb-4 transition-transform duration-300 hover:scale-110 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          />
          <h2
            className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {product.title}
          </h2>
          <p className="text-blue-600 font-bold mb-4">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
