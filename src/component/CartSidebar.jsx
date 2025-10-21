import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";

const CartSidebar = () => {
  const { cartItems, removeFromCart, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  const handlePlaceOrder = () => setShowConfirm(true);

  const handleConfirmOrder = () => {
    setShowConfirm(false);
    setOrderPlaced(true);

    setTimeout(() => {
      clearCart();
      setIsCartOpen(false);
      setOrderPlaced(false);
    }, 3000); // stays longer for the full animation
  };

  return (
    <>
      {/* 🔹 Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[9998]"
            onClick={() => setIsCartOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 🔹 Sidebar Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[9999] flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">🛒 Your Cart</h2>
              <motion.button
                whileHover={{ rotate: 90, color: "#ef4444" }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={() => setIsCartOpen(false)}
                className="text-gray-600 text-2xl font-bold"
              >
                ✕
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="p-4 overflow-y-auto h-[calc(100%-180px)]">
              {cartItems.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500 text-center mt-10"
                >
                  Your cart is empty 🛒
                </motion.p>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between mb-4 border-b pb-3"
                  >
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        ${Number(item.price).toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </motion.button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Total:</h3>
                <p className="font-bold text-lg">${Number(totalPrice).toFixed(2)}</p>
              </div>
              {cartItems.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlaceOrder}
                  className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition w-full font-medium"
                >
                  Place Order
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Confirm Order Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-[10000]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center"
            >
              <h2 className="text-lg font-semibold mb-4">Confirm Your Order</h2>
              <p className="text-gray-600 mb-4">
                You are about to place an order for{" "}
                <span className="font-medium">{cartItems.length}</span> item(s) totaling{" "}
                <span className="font-bold">${Number(totalPrice).toFixed(2)}</span>.
              </p>
              <div className="flex justify-between mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowConfirm(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleConfirmOrder}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌈 Success Message with Effects */}
      <AnimatePresence>
        {orderPlaced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-[10001]"
          >
            {/* Floating confetti dots */}
            {[...Array(15)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-3 h-3 rounded-full bg-blue-400"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 300 - 150,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 1.5 + Math.random(),
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Success Box */}
            <motion.div
              initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
              animate={{
                scale: [0.5, 1.1, 1],
                rotate: [0, 10, 0],
                opacity: 1,
              }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-green-600 text-white px-8 py-5 rounded-2xl shadow-xl text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], boxShadow: ["0 0 0px", "0 0 25px #22c55e", "0 0 0px"] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ✅ <span className="font-semibold">Order placed successfully!</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSidebar;
