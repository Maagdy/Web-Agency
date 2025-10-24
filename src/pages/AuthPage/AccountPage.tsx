import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import type { AuthState } from "../../redux/slices/auth/types";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  // Mock user data - replace with your actual user data from Redux/context
  const user = useAppSelector((state: { auth: AuthState }) => state.auth.user);
  const isGuest = user?.is_guest;
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    full_name: user?.full_name || "",
    avatar_url: user?.avatar_url || "",
    bio: user?.bio || "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Add your update user API call here
      console.log("Saving user data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || "",
      full_name: user?.full_name || "",
      avatar_url: user?.avatar_url || "",
      bio: user?.bio || "",
    });
    setIsEditing(false);
  };

  if (!user || isGuest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Please log in to view your account
          </h2>
          <button
            onClick={() => navigate("/auth")}
            className="px-6 py-2 rounded-lg bg-[var(--mainColor)] cursor-pointer hover:bg-[var(--mainColor)]/90 text-white font-medium"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1
              className="text-3xl font-bold"
              style={{ color: "var(--mainColor)" }}
            >
              My Account
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="text-center">
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
                  style={{ backgroundColor: "var(--mainColor)" }}
                >
                  {user.full_name?.charAt(0).toUpperCase() ||
                    user.email?.charAt(0).toUpperCase() ||
                    "U"}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {user.full_name || "No name set"}
                </h2>
                <p className="text-gray-600 mb-2">
                  {user.username ? `@${user.username}` : "No username set"}
                </p>
                <p className="text-sm text-gray-500 mb-4">{user.email}</p>

                {user.bio && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{user.bio}</p>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Account Type:</span>
                    <span
                      className={`font-medium ${
                        user.is_guest ? "text-gray-500" : "text-green-600"
                      }`}
                    >
                      {user.is_guest ? "Guest" : "Registered"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Member Since:</span>
                    <span className="font-medium">
                      {new Date(user.created_at!).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Last Updated:</span>
                    <span className="font-medium">
                      {new Date(user.updated_at!).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Account Details
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
                    style={{
                      borderColor: "var(--mainColor)",
                      color: "var(--mainColor)",
                    }}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="space-x-2">
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors duration-200 disabled:opacity-50"
                      style={{ backgroundColor: "var(--mainColor)" }}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600">
                    {user.email || "No email set"}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                      placeholder="Enter your username"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                      {user.username || "Not set"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) =>
                        setFormData({ ...formData, full_name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                      {user.full_name || "Not set"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avatar URL
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.avatar_url}
                      onChange={(e) =>
                        setFormData({ ...formData, avatar_url: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                      {user.avatar_url || "Not set"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800 min-h-[100px]">
                      {user.bio || "No bio added yet"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User ID
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600 font-mono text-sm">
                    {user.id}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Created At
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600 text-sm">
                      {new Date(user.created_at!).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Updated At
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600 text-sm">
                      {new Date(user.updated_at!).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="mt-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Account Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
                <h4 className="font-medium text-gray-800 mb-1">
                  Change Password
                </h4>
                <p className="text-sm text-gray-600">
                  Update your account password
                </p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
                <h4 className="font-medium text-gray-800 mb-1">
                  Privacy Settings
                </h4>
                <p className="text-sm text-gray-600">
                  Manage your privacy preferences
                </p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
                <h4 className="font-medium text-gray-800 mb-1">
                  Download Data
                </h4>
                <p className="text-sm text-gray-600">
                  Export your account data
                </p>
              </button>
              <button className="p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200 text-left">
                <h4 className="font-medium text-red-600 mb-1">
                  Delete Account
                </h4>
                <p className="text-sm text-red-500">
                  Permanently remove your account
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
