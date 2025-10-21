import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Using dummyjson (more reliable than fakestoreapi)
        const res = await fetch("https://dummyjson.com/products");

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data.products); // dummyjson returns data inside "products"
      } catch (err) {
        console.error("❌ Fetch failed:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mt-20">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-48 w-full object-contain p-4"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">
              {product.title}
            </h3>
            <p className="text-blue-600 font-bold mb-2">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition w-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
