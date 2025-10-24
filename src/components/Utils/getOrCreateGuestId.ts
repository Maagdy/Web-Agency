import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../supabaseClient";

export async function getOrCreateGuestId() {
  let guestId = localStorage.getItem("guest_user_id");

  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem("guest_user_id", guestId);

    const { error } = await supabase
      .from("users")
      .insert([{ id: guestId, is_guest: true }]);

    if (error) throw error;
  }

  return { id: guestId, is_guest: true };
}
