import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";

const Navbar = ({ onCartClick }) => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Shop", path: "/shop" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="fixed top-0 left-0 w-full bg-white backdrop-blur-md shadow-md z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* 🔹 Logo */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/"
            className="text-2xl font-extrabold text-blue-600 tracking-tight"
          >
            MyShop
          </Link>
        </motion.div>

        {/* 🔹 Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-gray-700">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link
                to={link.path}
                className={`relative font-medium after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-[-3px] after:bg-blue-600 hover:after:w-full after:transition-all ${
                  location.pathname === link.path
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}

          {/* 🔹 Cart Button */}
          <motion.button
            onClick={onCartClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
            aria-label="Open cart"
          >
            <motion.span
              role="img"
              aria-label="cart"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{
                repeat: totalItems > 0 ? 1 : 0,
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              🛒
            </motion.span>
            <span>Cart</span>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-[1px] rounded-full shadow"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* 🔹 Mobile Hamburger */}
        <button
          className="md:hidden text-3xl text-blue-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* 🔹 Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="md:hidden fixed top-16 right-0 w-3/4 h-screen bg-white shadow-lg flex flex-col items-center gap-6 pt-10 text-lg z-40"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`font-semibold ${
                  location.pathname === link.path
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* 🔹 Cart in mobile menu */}
            <motion.button
              onClick={() => {
                onCartClick();
                setMenuOpen(false);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
            >
              🛒 Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-[1px] rounded-full shadow">
                  {totalItems}
                </span>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
