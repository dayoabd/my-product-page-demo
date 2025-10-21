import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error("❌ Fetch failed:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Loading animation with logo
  if (loading)
    return (
      <motion.div
        className="flex flex-col justify-center items-center h-screen bg-gray-50"
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

        {/* Text Animation */}
        <motion.p
          className="text-gray-600 text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading products...
        </motion.p>
      </motion.div>
    );

  // 🔹 Error handling
  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );

  // 🔹 Product grid (after loading)
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mt-20"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link to={`/product/${product.id}`}>
            <motion.img
              src={product.thumbnail}
              alt={product.title}
              className="h-48 w-full object-contain p-4 cursor-pointer"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          </Link>

          <div className="p-4">
            <Link
              to={`/product/${product.id}`}
              className="block text-lg font-semibold mb-2 line-clamp-1 hover:text-blue-600 transition-colors"
            >
              {product.title}
            </Link>

            <p className="text-blue-600 font-bold mb-3">${product.price}</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition w-full font-medium"
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductList;
