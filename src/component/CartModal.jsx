// src/component/CartModal.jsx
import React from "react";
import { useCart } from "./CartContext";

const CartModal = ({ onClose }) => {
  const {
    cartItems,
    removeFromCart,
    orderNow,
    totalPrice,
    orderSuccess,
    closeOrderModal,
    orderedItems,
  } = useCart();

  if (orderSuccess) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Order Successful 🎉
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase!
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {orderedItems.map((item) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.title}
                className="w-12 h-12 object-contain"
              />
            ))}
          </div>
          <button
            onClick={closeOrderModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative animate-fadeIn">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mb-6">Your cart is empty 🛒</p>
        ) : (
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <p className="font-semibold text-gray-700 text-sm line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-blue-600 font-bold">${item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-between items-center mt-6">
          <span className="text-gray-700 font-semibold">
            Total: ${totalPrice}
          </span>
          <button
            onClick={orderNow}
            disabled={cartItems.length === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Order Now
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartModal;
