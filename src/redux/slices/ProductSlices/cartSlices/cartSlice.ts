import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CartItem, CartState } from "./types";
import { calculateTotal, findItemIndex } from "./cartHelpers";
import { supabase } from "../../../../supabaseClient";

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Helper to get current user ID (guest or authenticated)
const getCurrentUserId = async (): Promise<string> => {
  // First check if authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session?.user) {
    return session.user.id;
  }

  // Otherwise get guest ID from localStorage
  const guestId = localStorage.getItem("guest_user_id");
  if (!guestId) {
    throw new Error("No user ID found - user not initialized");
  }

  return guestId;
};

// Load cart from Supabase (with join)
export const loadCart = createAsyncThunk(
  "cart/loadCart",
  async (userId?: string) => {
    // If no userId provided, get current user
    const currentUserId = userId || (await getCurrentUserId());

    // First get or create the cart
    const { data: cart, error } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", currentUserId)
      .single();

    let cartId: string;

    if (error && error.code === "PGRST116") {
      // Cart doesn't exist, create it
      const { data: newCart, error: createError } = await supabase
        .from("carts")
        .insert({ user_id: currentUserId })
        .select("id")
        .single();

      if (createError || !newCart)
        throw createError || new Error("Failed to create cart");
      cartId = newCart.id;
    } else if (error || !cart) {
      throw error || new Error("Failed to get cart");
    } else {
      cartId = cart.id;
    }

    // Then get all cart items
    const { data: items, error: itemsError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("cart_id", cartId);

    if (itemsError) throw itemsError;

    return (items || []).map((item) => ({
      id: item.product_id,
      title: item.title,
      price: Number(item.price),
      quantity: item.quantity,
      image: item.image,
    })) as CartItem[];
  }
);

// Sync item to Supabase
export const syncCartItem = createAsyncThunk(
  "cart/syncCartItem",
  async (
    { userId, item }: { userId?: string; item: CartItem },
    { rejectWithValue }
  ) => {
    try {
      // If no userId provided, get current user
      const currentUserId = userId || (await getCurrentUserId());

      // Get or create cart
      const { data: cart, error: cartError } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", currentUserId)
        .single();

      let cartId: string;

      if (cartError && cartError.code === "PGRST116") {
        const { data: newCart, error: createError } = await supabase
          .from("carts")
          .insert({ user_id: currentUserId })
          .select("id")
          .single();

        if (createError || !newCart)
          return rejectWithValue(
            createError?.message || "Failed to create cart"
          );
        cartId = newCart.id;
      } else if (cartError || !cart) {
        return rejectWithValue(cartError?.message || "Failed to get cart");
      } else {
        cartId = cart.id;
      }

      // Upsert cart item
      const { error } = await supabase.from("cart_items").upsert(
        {
          cart_id: cartId,
          product_id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "cart_id,product_id" }
      );

      if (error) return rejectWithValue(error.message);
      return item;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(String(error) || "Failed to sync cart item");
    }
  }
);

// Remove item from Supabase
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ userId, itemId }: { userId?: string; itemId: string }) => {
    // If no userId provided, get current user
    const currentUserId = userId || (await getCurrentUserId());

    // Get cart
    const { data: cart, error: cartError } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", currentUserId)
      .single();

    if (cartError) throw cartError;

    // Delete cart item
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", cart.id)
      .eq("product_id", itemId);

    if (error) throw error;
    return itemId;
  }
);

// Clear cart in Supabase
export const clearCartInDb = createAsyncThunk(
  "cart/clearCartInDb",
  async (userId?: string) => {
    // If no userId provided, get current user
    const currentUserId = userId || (await getCurrentUserId());

    // Get cart
    const { data: cart, error: cartError } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", currentUserId)
      .single();

    if (cartError) {
      if (cartError.code === "PGRST116") return; // Cart doesn't exist, nothing to clear
      throw cartError;
    }

    // Delete all cart items (cart remains)
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", cart.id);

    if (error) throw error;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = findItemIndex(state.items, action.payload.id);

      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload });
      }

      const totals = calculateTotal(state.items);
      state.totalPrice = totals.totalPrice;
      state.totalQuantity = totals.totalQuantity;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const totals = calculateTotal(state.items);
      state.totalPrice = totals.totalPrice;
      state.totalQuantity = totals.totalQuantity;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const index = findItemIndex(state.items, id);
      if (index >= 0) {
        state.items[index].quantity = quantity;
      }
      const totals = calculateTotal(state.items);
      state.totalPrice = totals.totalPrice;
      state.totalQuantity = totals.totalQuantity;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.items = action.payload;
      const totals = calculateTotal(state.items);
      state.totalPrice = totals.totalPrice;
      state.totalQuantity = totals.totalQuantity;
    });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
