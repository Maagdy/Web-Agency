import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { guestUser, type AuthState, type User } from "./types";
import { getOrCreateGuestId } from "../../../components/Utils/getOrCreateGuestId";
import { supabase } from "../../../supabaseClient";

const initialState: AuthState = {
  user: guestUser, // 👈 always starts as guest
  loading: false,
  error: null,
};

export const initUser = createAsyncThunk("auth/initUser", async () => {
  // First check if user is already authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    // User is authenticated, fetch their user record
    const { data: userRow, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) throw error;
    return userRow as User;
  }

  // No auth session, check if there's a guest in localStorage
  const guestId = localStorage.getItem("guest_user_id");

  if (guestId) {
    // Try to get the existing guest record
    const { data: existingGuest, error: guestError } = await supabase
      .from("users")
      .select("*")
      .eq("id", guestId)
      .single();

    if (!guestError && existingGuest) {
      // Found existing guest (could be original guest or signed-up guest)
      return existingGuest as User;
    }
  }

  // No existing guest or guest not found, create new one
  return await getOrCreateGuestId();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      if (action.payload !== null) {
        state.user = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
