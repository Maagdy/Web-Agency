import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import MiniCartModal from "./MiniCartModel";

export default function FloatingCartButton() {
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-25 left-10 md:bottom-15 z-[9999] touch-none">
        <button
          onClick={() => setOpen(true)}
          className="relative flex items-center justify-center w-12 h-12 bg-[var(--mainColor)] text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Open cart"
        >
          <ShoppingCart size={26} />
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalQuantity}
            </span>
          )}
        </button>
      </div>

      <MiniCartModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
