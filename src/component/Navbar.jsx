import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

const Navbar = ({ onCartClick }) => {
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/100 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-extrabold text-blue-600 hover:scale-105 transition-transform"
        >
          MyShop
        </Link>

        <div className="flex items-center gap-6 text-gray-700">
          <Link
            to="/"
            className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-[-2px] after:bg-blue-600 hover:after:w-full after:transition-all"
          >
            Home
          </Link>

          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            🛒
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-[1px] rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
