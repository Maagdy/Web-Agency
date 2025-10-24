import type { CartItem } from "./types";

export const calculateTotal = (items: CartItem[]) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { totalQuantity, totalPrice };
};

export const findItemIndex = (items: CartItem[], id: string) => {
  return items.findIndex((item) => item.id === id);
};
