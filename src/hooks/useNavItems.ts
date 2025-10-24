import { useMemo } from "react";
import type { BottomNavItem } from "../components/types/types";
import type { AuthState } from "../redux/slices/auth/types";
import { Home, User, FileStack } from "lucide-react";
import { useAppSelector } from "../redux/hooks";
import { Login } from "@mui/icons-material";

function useNavItems(): BottomNavItem[] {
  const user = useAppSelector((state: { auth: AuthState }) => state.auth.user);
  const isLoggedIn = !user.is_guest;

  return useMemo(
    () => [
      { id: "home", path: "/", label: "Home", icon: Home },
      { id: "portfolio", path: "/portfolio", label: "Portfolio", icon: User },
      { id: "services", path: "/services", label: "Services", icon: FileStack },
      {
        id: "auth",
        path: isLoggedIn ? "/my-account" : "/auth",
        label: isLoggedIn ? "My Account" : "Login",
        icon: isLoggedIn ? User : Login,
      },
    ],
    [isLoggedIn]
  );
}
export default useNavItems;
