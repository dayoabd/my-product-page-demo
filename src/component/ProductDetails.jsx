import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";
import CartSidebar from "./CartSidebar";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  // 🔹 Enhanced Animated Loading Screen with Logo
  if (!product)
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-screen bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo Image */}
        <motion.img
          src="/logo.png" 
          alt="My-Shop Logo"
          className="w-32 h-32 rounded-full shadow-lg object-cover mb-5 border-4 border-blue-500"
          initial={{ scale: 0.9 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />


        {/* Loading Text */}
        <motion.p
          className="text-gray-600 text-lg  font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Loading product details...
        </motion.p>
      </motion.div>
    );

  // 🔹 Product Display
  return (
    <motion.div
      className="max-w-6xl mx-auto mt-24 px-6 grid md:grid-cols-2 gap-10 items-start relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Product Image */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-96 h-96 object-contain rounded-lg shadow-md"
        />
      </motion.div>

      {/* Product Info */}
      <motion.div
        className="text-left"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-3 text-gray-800">
          {product.title}
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>
        <p className="text-blue-600 font-bold text-2xl mb-8">
          ${product.price}
        </p>

        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              addToCart(product);
              setIsCartOpen(true);
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Add to Cart
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-300 transition font-medium"
          >
            Back to Home
          </motion.button>
        </div>
      </motion.div>

      {/* Sidebar */}
      <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </motion.div>
  );
};

export default ProductDetails;
