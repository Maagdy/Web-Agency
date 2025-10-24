import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import type { BottomNavItem } from "../types/types";
import useNavItems from "../../hooks/useNavItems"; // <-- import your hook

interface BottomNavigationProps {
  className?: string;
  showLabels?: boolean;
  variant?: "default" | "floating" | "minimal";
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  className = "",
  showLabels = true,
  variant = "default",
}) => {
  const items: BottomNavItem[] = useNavItems(); // <-- use dynamic nav items
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active index based on current path
  useEffect(() => {
    const currentIndex = items.findIndex(
      (item) =>
        location.pathname === item.path ||
        (item.path !== "/" && location.pathname.startsWith(item.path))
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname, items]);

  const getVariantClasses = () => {
    switch (variant) {
      case "floating":
        return "mx-4 mb-4 rounded-2xl shadow-2xl border border-white/20";
      case "minimal":
        return "border-t border-gray-200/20";
      default:
        return "border-t border-white/20";
    }
  };

  const getItemClasses = (index: number) => {
    const isActive = activeIndex === index;
    const baseClasses =
      "relative flex flex-col items-center justify-center transition-all duration-300 ease-out";

    if (variant === "minimal") {
      return `${baseClasses} ${
        isActive ? "text-blue-500" : "text-gray-400 hover:text-gray-300"
      }`;
    }

    return `${baseClasses} ${
      isActive
        ? "text-cyan-300 transform scale-110"
        : "text-gray-400 hover:text-gray-300 hover:scale-105"
    }`;
  };

  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 z-50 
        bg-black/80 backdrop-blur-md 
        ${getVariantClasses()}
        ${className}
      `}
    >
      {/* Active indicator background */}
      {variant !== "minimal" && (
        <div
          className="absolute top-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 ease-out rounded-full"
          style={{
            width: `${100 / items.length}%`,
            left: `${(activeIndex * 100) / items.length}%`,
          }}
        />
      )}

      <div className="flex items-center justify-around h-20 px-2">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          const IconComponent = item.icon;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`
                flex-1 ${getItemClasses(index)}
                ${variant === "floating" ? "mx-1" : "mx-2"}
              `}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative">
                {/* Icon */}
                <div
                  className={`
                  relative p-2 rounded-full transition-all duration-300
                  ${isActive && variant !== "minimal" ? "bg-cyan-500/20" : ""}
                `}
                >
                  <IconComponent
                    size={variant === "minimal" ? 20 : 24}
                    className={`
                      transition-all duration-300
                      ${isActive ? "drop-shadow-lg" : ""}
                    `}
                  />

                  {/* Badge */}
                  {item.badge && item.badge > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium">
                      {item.badge > 99 ? "99+" : item.badge}
                    </div>
                  )}
                </div>

                {/* Active dot indicator for minimal variant */}
                {variant === "minimal" && isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                )}
              </div>

              {/* Label */}
              {showLabels && (
                <span
                  className={`
                  text-xs font-medium mt-1 transition-all duration-300
                  ${isActive ? "opacity-100" : "opacity-70"}
                  ${variant === "minimal" ? "text-xs" : ""}
                `}
                >
                  {item.label}
                </span>
              )}

              {/* Ripple effect on tap */}
              <div className="absolute inset-0 rounded-full bg-white/0 hover:bg-white/5 transition-colors duration-200" />
            </Link>
          );
        })}
      </div>

      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-transparent" />
    </nav>
  );
};
