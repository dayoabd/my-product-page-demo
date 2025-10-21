import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";

const CartSidebar = () => {
  const { cartItems, removeFromCart, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  const handlePlaceOrder = () => {
    setShowConfirm(true);
  };

  const handleConfirmOrder = () => {
    setShowConfirm(false);
    setOrderPlaced(true);

    setTimeout(() => {
      clearCart();
      setIsCartOpen(false);
      setOrderPlaced(false);
    }, 2000); // ✅ auto close after 5 seconds
  };

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
        <div className="p-4 overflow-y-auto h-[calc(100%-180px)]">
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

        {/* Total + Place Order */}
        <div className="p-4 border-t flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Total:</h3>
            <p className="font-bold text-lg">${Number(totalPrice).toFixed(2)}</p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition w-full"
            >
              Place Order
            </button>
          )}
        </div>
      </div>

      {/* Confirm Order Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[10000]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-center">Confirm Your Order</h2>
            <p className="text-gray-600 mb-4 text-center">
              You are about to place an order for{" "}
              <span className="font-medium">{cartItems.length}</span> item(s) totaling{" "}
              <span className="font-bold">${Number(totalPrice).toFixed(2)}</span>.
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Centered Success Message */}
      {orderPlaced && (
        <div className="fixed inset-0 flex items-center justify-center z-[10001]">
          <div className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg text-center animate-fadeIn">
            ✅ Order placed successfully!
          </div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;
