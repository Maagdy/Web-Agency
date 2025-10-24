import { getOrCreateGuestId } from "../../../components/Utils/getOrCreateGuestId";
import { supabase } from "../../../supabaseClient";
import type { User } from "./types";

export async function signupUser(
  email: string,
  password: string,
  fullName: string
): Promise<void> {
  const guest = await getOrCreateGuestId();

  const cleanEmail = email.trim();
  const cleanFullName = fullName.trim();

  // Create Supabase Auth account (but don't auto-login)
  const { data, error } = await supabase.auth.signUp({
    email: cleanEmail,
    password,
    options: {
      data: {
        full_name: cleanFullName,
        guest_id: guest.id,
      },
    },
  });
  if (error) throw error;
  if (!data.user) throw new Error("Signup failed");

  // Update the guest record to become a real user with the auth ID
  const { error: userError } = await supabase
    .from("users")
    .update({
      id: data.user.id,
      email: cleanEmail,
      full_name: cleanFullName,
      is_guest: true, // Keep as guest until they login
    })
    .eq("id", guest.id);

  if (userError) throw userError;

  // Sign out immediately so user needs to login
  await supabase.auth.signOut();
}

export async function loginUser(
  email: string,
  password: string
): Promise<User> {
  try {
    // Get current guest ID before logging in
    const guestId = localStorage.getItem("guest_user_id");
    console.log("🔍 Login attempt for:", email, "Guest ID:", guestId);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("❌ Auth signin error:", error);
      throw error;
    }
    if (!data.user) {
      console.error("❌ No user data returned from auth");
      throw new Error("Login failed");
    }

    console.log("✅ Auth successful, user ID:", data.user.id);

    const { data: userRow, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (userError) {
      console.error("❌ User row fetch error:", userError);
      throw new Error(`Failed to fetch user data: ${userError.message}`);
    }

    console.log("✅ User row fetched:", userRow);

    // Update user to be no longer a guest
    const { error: updateError } = await supabase
      .from("users")
      .update({ is_guest: false })
      .eq("id", data.user.id);

    if (updateError) {
      console.error("❌ User update error:", updateError);
      throw new Error(`Failed to update user: ${updateError.message}`);
    }

    console.log("✅ User updated to non-guest");

    // Clean up localStorage - the user record in DB is now the auth user record
    if (guestId) {
      localStorage.removeItem("guest_user_id");
      console.log("✅ Guest ID removed from localStorage");
    }

    // Return updated user data
    const finalUser = { ...userRow, is_guest: false } as User;
    console.log("✅ Login complete, returning user:", finalUser);
    return finalUser;
  } catch (err) {
    console.error("❌ Detailed login error:", err);
    console.error("❌ Error type:", typeof err);
    console.error("❌ Error constructor:", err?.constructor?.name);
    throw err;
  }
}

export async function logoutUser(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
