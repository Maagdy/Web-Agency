export interface User {
  id: string;
  username?: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  created_at?: string;
  updated_at?: string;
  is_guest: boolean;
}

export interface AuthState {
  user: User; // never null
  loading: boolean;
  error: string | null;
}

export const guestUser: User = {
  id: "guest", // can be a UUID or placeholder
  is_guest: true,
  username: "Guest",
  email: undefined,
  full_name: undefined,
  avatar_url: undefined,
  bio: undefined,
};
