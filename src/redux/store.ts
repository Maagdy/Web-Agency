import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import cartReducer from "./slices/ProductSlices/cartSlices/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
