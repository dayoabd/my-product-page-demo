import React from "react";
import { useCart } from "./CartContext";

const CartSidebar = () => {
  const { cartItems, removeFromCart, isCartOpen, setIsCartOpen } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-[9999] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 overflow-y-auto h-[calc(100%-130px)]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Your cart is empty 🛒</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4 border-b pb-3"
              >
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    ${Number(item.price).toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Total */}
        <div className="p-4 border-t flex justify-between items-center">
          <h3 className="font-semibold">Total:</h3>
          <p className="font-bold text-lg">${Number(totalPrice).toFixed(2)}</p>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
