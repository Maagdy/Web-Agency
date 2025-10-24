import { useLocation, useNavigate, Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import type { NavigationItemProps, NavItem, SubMenuItem } from "../types/types";

export const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  index,
  openSubmenu,
  setOpenSubmenu,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [openNestedIndex, setOpenNestedIndex] = useState<number | null>(null);

  // Close nested submenu when parent closes
  useEffect(() => {
    if (openSubmenu !== index) {
      setOpenNestedIndex(null);
    }
  }, [openSubmenu, index]);

  const renderSubmenu = (
    submenu?: SubMenuItem[],
    currentOpenIndex?: number | null,
    setCurrentOpenIndex?: (index: number | null) => void
  ) => {
    if (!submenu) return null;

    return (
      <div className="py-1">
        {submenu.map((subItem, subIndex) => {
          const hasNested = !!subItem.submenu;

          return (
            <div key={subItem.path} className="relative">
              <Link
                to={hasNested ? "#" : subItem.path}
                onClick={(e) => {
                  if (hasNested) {
                    e.preventDefault();
                    if (setCurrentOpenIndex) {
                      setCurrentOpenIndex(
                        currentOpenIndex === subIndex ? null : subIndex
                      );
                    }
                  } else {
                    setOpenSubmenu(null);
                    setOpenNestedIndex(null);
                    navigate(subItem.path);
                  }
                }}
                className="flex items-center justify-between px-4 py-2 text-sm hover:bg-white/10 hover:text-cyan-300 transition-colors duration-200 cursor-pointer"
              >
                <span>{subItem.label}</span>
                {hasNested && (
                  <svg
                    className={`w-3 h-3 ml-2 text-gray-400 transition-transform duration-200 ${
                      currentOpenIndex === subIndex ? "rotate-90" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L11.586 9 7.293 4.707a1 1 0 011.414-1.414l5 5a1 1 0 01-1.414 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Link>

              {hasNested && subItem.submenu && (
                <div
                  className={`absolute top-0 right-full w-48 bg-[var(--mainColor)] backdrop-blur-md rounded-lg shadow-xl border border-white/20 z-50 transition-all ease-out ${
                    currentOpenIndex === subIndex
                      ? "opacity-100 visible translate-y-0 scale-100 duration-300"
                      : "opacity-0 invisible -translate-y-2 scale-95 duration-200"
                  }`}
                >
                  {renderSubmenu(subItem.submenu)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const isActive = (it: NavItem) =>
    location.pathname === it.path ||
    !!(it.submenu && it.submenu.some((s) => location.pathname === s.path));

  const handleItemClick = () => {
    if (item.submenu) {
      // Toggle submenu
      setOpenSubmenu((prev) => (prev === index ? null : index));
      // Reset nested is handled in useEffect
    } else {
      setOpenSubmenu(null);
      setOpenNestedIndex(null);
      navigate(item.path);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div
        role="link"
        tabIndex={0}
        onClick={handleItemClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleItemClick();
          }
        }}
        className={`flex items-center justify-between py-2 px-2 cursor-pointer select-none hover:text-cyan-300 transition-colors duration-200 ${
          isActive(item) ? "text-cyan-300" : ""
        }`}
      >
        <span className="whitespace-nowrap">{item.label}</span>

        {item.submenu && (
          <svg
            className={`w-2 h-2 lg:w-3 lg:h-3 ml-1 transition-transform duration-300 ${
              openSubmenu === index ? "rotate-180" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {item.submenu && (
        <div
          className={`absolute top-full left-0 w-48 bg-[var(--mainColor)] backdrop-blur-md rounded-lg shadow-xl border border-white/20 z-50 transition-all ease-out ${
            openSubmenu === index
              ? "opacity-100 visible translate-y-0 scale-100 duration-300"
              : "opacity-0 invisible -translate-y-2 scale-95 duration-200"
          }`}
          style={{ marginTop: "-2px" }}
        >
          {renderSubmenu(item.submenu, openNestedIndex, setOpenNestedIndex)}
        </div>
      )}
    </div>
  );
};
