import { useState } from "react";
import { useDispatch } from "react-redux";

import { getOrCreateGuestId } from "../../components/Utils/getOrCreateGuestId";
import { supabase } from "../../supabaseClient";
import { setUser } from "../../redux/slices/auth/authSlice";
import { loginUser } from "../../redux/slices/auth/authHelpers";

const AuthPage: React.FC = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSignupSuccess(false);

    try {
      if (isLogin) {
        const user = await loginUser(email, password);

        dispatch(
          setUser({
            ...user,
            is_guest: false, // ✅ ensure not guest
          })
        );
      } else {
        // SIGNUP - get guest data first, then migrate
        const { id: guestId } = await getOrCreateGuestId();

        // Create auth account
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { full_name: fullName.trim() } },
        });
        if (error) throw error;

        const user = data.user;
        if (user) {
          // 🔄 Migrate guest data to the new user
          await supabase
            .from("cart_items")
            .update({ user_id: user.id })
            .eq("user_id", guestId);

          await supabase
            .from("favorites")
            .update({ user_id: user.id })
            .eq("user_id", guestId);

          await supabase
            .from("project_comments")
            .update({ user_id: user.id })
            .eq("user_id", guestId);

          // ❌ WRONG: This tries to UPDATE the ID field which might not work
          // Update users table - upgrade guest to real user BUT keep guest status
          // await supabase
          //   .from("users")
          //   .update({
          //     id: user.id, // This is problematic - can't update primary key
          //     email: email.trim(),
          //     full_name: fullName.trim(),
          //     is_guest: true,
          //   })
          //   .eq("id", guestId);

          // ✅ CORRECT: Delete old guest record and create new one
          await supabase.from("users").delete().eq("id", guestId);

          const { error: insertError } = await supabase.from("users").insert({
            id: user.id,
            email: email.trim(),
            full_name: fullName.trim(),
            is_guest: true,
            created_at: new Date().toISOString(),
          });

          if (insertError) throw insertError;

          // 🔥 KEY FIX: Update Redux state with the new user data
          dispatch(
            setUser({
              id: user.id,
              email: email.trim(),
              full_name: fullName.trim(),
              is_guest: true, // Still guest but now has email/name
              created_at: new Date().toISOString(), // Add required fields
            })
          );

          // Store the new user ID as guest_user_id so the app knows about the updated guest
          localStorage.setItem("guest_user_id", user.id);

          // Sign out the auth session (but keep the guest session in Redux)
          await supabase.auth.signOut();

          setSignupSuccess(true);

          // Clear form and switch to login
          setEmail("");
          setPassword("");
          setFullName("");
          setIsLogin(true);
        }
      }
    } catch (err: unknown) {
      console.error("❌ Full auth error details:", err);
      console.error("❌ Error type:", typeof err);
      console.error("❌ Error constructor:", err?.constructor?.name);

      let message = "An unknown error occurred";

      if (err instanceof Error) {
        message = err.message;
        console.error("❌ Error message:", message);
        console.error("❌ Error stack:", err.stack);
      } else if (typeof err === "string") {
        message = err;
      } else if (err && typeof err === "object") {
        // Handle Supabase errors
        if ("message" in err && typeof err.message === "string") {
          message = err.message;
        } else if (
          "error_description" in err &&
          typeof err.error_description === "string"
        ) {
          message = err.error_description;
        } else {
          message = JSON.stringify(err);
        }
      }

      setError(message);
      console.error("❌ Auth error:", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-[var(--mainColor)] mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--mainColor)]"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--mainColor)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--mainColor)]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg text-white font-semibold shadow-md transition duration-200 disabled:opacity-50"
            style={{ backgroundColor: "var(--mainColor)" }}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
        {signupSuccess && (
          <p className="text-green-600 text-sm mt-4">
            Account created successfully! Please login with your credentials.
          </p>
        )}

        <p className="text-sm text-gray-600 text-center mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setSignupSuccess(false);
            }}
            className="font-medium"
            style={{ color: "var(--mainColor)" }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
