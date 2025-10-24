// src/components/MiniCartModal.tsx
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import type { RootState } from "../../redux/store";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MiniCartModal({ open, onClose }: Props) {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 z-50 w-80 bg-white rounded-2xl shadow-xl p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button onClick={onClose}>
                <X className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-6">
                Your cart is empty 🛍️
              </p>
            ) : (
              <>
                <ul className="max-h-56 overflow-y-auto">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} × ${item.price}
                        </p>
                      </div>
                      <p className="font-semibold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Total:</span>
                  <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    // you can navigate to /checkout here if you want
                  }}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                >
                  Checkout
                </button>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
