import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { navItems } from "../../common/constants/navItems.ts";
import { NavigationItem } from "../UI/NavigationItem.tsx";
import DrawerNavigation from "./Drawer.tsx";
import { BottomNavigation } from "./BottomNavBar.tsx";
import type { NavItem, SubMenuItem } from "../types/types.ts";
import { logo } from "../../common/assets/images/index.ts";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<boolean>(false);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [visibleItemsCount, setVisibleItemsCount] = useState<number>(
    navItems.length
  );
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const moreMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate how many items can fit in the available space
  useEffect(() => {
    const calculateVisibleItems = () => {
      if (!navContainerRef.current || window.innerWidth < 768) return;

      const container = navContainerRef.current;
      const containerWidth = container.offsetWidth;
      const quoteButtonWidth = 150;
      const moreButtonWidth = 40;
      const availableWidth =
        containerWidth - quoteButtonWidth - moreButtonWidth;

      let totalWidth = 0;
      let itemsCount = 0;
      const itemSpacing =
        window.innerWidth >= 1280 ? 32 : window.innerWidth >= 1024 ? 24 : 16;

      for (let i = 0; i < navItems.length; i++) {
        const estimatedItemWidth =
          navItems[i].label.length * 8 + 16 + (navItems[i].submenu ? 20 : 0);

        if (
          totalWidth + estimatedItemWidth + itemsCount * itemSpacing <=
          availableWidth
        ) {
          totalWidth += estimatedItemWidth;
          itemsCount++;
        } else break;
      }

      const finalCount = Math.max(1, Math.min(itemsCount, navItems.length));

      if (finalCount === navItems.length) {
        const totalWidthWithoutMore =
          totalWidth + (finalCount - 1) * itemSpacing;
        if (totalWidthWithoutMore <= containerWidth - quoteButtonWidth) {
          setVisibleItemsCount(navItems.length);
          return;
        }
      }

      setVisibleItemsCount(finalCount);
    };

    calculateVisibleItems();
    const handleResize = () => setTimeout(calculateVisibleItems, 100);
    window.addEventListener("resize", handleResize);
    if (document.fonts)
      document.fonts.addEventListener("loadingdone", calculateVisibleItems);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (document.fonts)
        document.fonts.removeEventListener(
          "loadingdone",
          calculateVisibleItems
        );
    };
  }, []);

  // Close menus when clicking outside (only for desktop)
  useEffect(() => {
    // Only handle click outside when mobile menu is closed
    if (isMobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
        setOpenSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]); // Add isMobileMenuOpen as dependency

  // Stable hover handlers for More menu
  const handleMoreMenuEnter = () => {
    if (moreMenuTimeoutRef.current) {
      clearTimeout(moreMenuTimeoutRef.current);
      moreMenuTimeoutRef.current = null;
    }
    setIsMoreMenuOpen(true);
  };

  const handleMoreMenuLeave = () => {
    moreMenuTimeoutRef.current = setTimeout(() => {
      setIsMoreMenuOpen(false);
    }, 400);
  };

  const isActive = (item: NavItem): boolean => {
    return (
      location.pathname === item.path ||
      !!(
        item.submenu &&
        item.submenu.some((sub) => location.pathname === sub.path)
      )
    );
  };

  const visibleItems = navItems.slice(0, visibleItemsCount);
  const hiddenItems = navItems.slice(visibleItemsCount);

  // <header className="bg-[var(--mainColor)] flex items-center justify-between sticky w-full py-10 px-12 font-medium md:px-24 lg:py-10 lg:px-32 text-white z-50 text-sm lg:text-base">
  //  className={`${
  //     location.pathname === "/" ? "bg-transparent" : "bg-[var(--mainColor)]"
  //   } flex items-center justify-between absolute w-full py-10 px-12 font-medium md:px-24 lg:py-10 lg:px-32 text-white z-50 text-sm lg:text-base`}

  return (
    <header className="bg-[var(--mainColor)] flex items-center justify-between sticky top-0 w-full py-10 px-12 font-medium md:px-24 lg:py-10 lg:px-32 text-white z-50 text-sm lg:text-base">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img
          className="w-28 lg:w-32 xl:w-36 2xl:w-40 cursor-pointer object-contain max-h-12 sm:max-h-16"
          onClick={() => navigate("/")}
          src={logo}
          alt="XTRAWEB Logo"
        />
      </div>

      {/* Desktop Navigation */}
      <nav ref={navRef} className="hidden md:flex items-center flex-1">
        <div
          ref={navContainerRef}
          className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8 flex-1 justify-end mr-6 lg:mr-8"
        >
          {/* Visible Items */}
          {visibleItems.map((item, index) => (
            <NavigationItem
              key={item.path}
              item={item}
              index={index}
              openSubmenu={openSubmenu}
              setOpenSubmenu={setOpenSubmenu}
            />
          ))}

          {/* More Menu */}
          {hiddenItems.length > 0 && (
            <div
              className="relative"
              onMouseEnter={handleMoreMenuEnter}
              onMouseLeave={handleMoreMenuLeave}
            >
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="hover:text-cyan-300 transition-colors duration-200 flex items-center p-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>

              {isMoreMenuOpen && (
                <div
                  className="absolute top-full right-0 w-56 bg-black/60 backdrop-blur-md rounded-lg shadow-xl border border-white/20 z-50 transition-all"
                  style={{
                    marginTop: "0px",
                    paddingTop: "4px",
                    transitionDuration: isMoreMenuOpen ? "200ms" : "75ms",
                  }}
                  onMouseEnter={handleMoreMenuEnter}
                  onMouseLeave={handleMoreMenuLeave}
                >
                  {/* Invisible bridge */}
                  <div className="absolute -top-1 left-0 right-0 h-1 bg-transparent" />

                  <div className="py-2 max-h-80 overflow-y-auto mt-1">
                    {hiddenItems.map((item: NavItem) => (
                      <div key={item.path}>
                        <Link
                          to={item.path}
                          onClick={() => setIsMoreMenuOpen(false)}
                          className={`block px-4 py-3 text-sm hover:bg-white/10 hover:text-cyan-300 transition-colors duration-200 ${
                            isActive(item) ? "text-cyan-300 bg-white/10" : ""
                          }`}
                        >
                          {item.label}
                        </Link>
                        {item.submenu && (
                          <div className="pl-4 border-l border-white/30 ml-4">
                            {item.submenu.map((subItem: SubMenuItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                onClick={() => setIsMoreMenuOpen(false)}
                                className={`block px-4 py-2 text-xs hover:bg-white/10 hover:text-cyan-300 transition-colors duration-200 ${
                                  location.pathname === subItem.path
                                    ? "text-cyan-300 bg-white/10"
                                    : ""
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quote Button */}
        <button
          onClick={() => navigate("/auth")}
          className="px-3 lg:px-4 xl:px-6 py-2 border-2 border-cyan-300 text-cyan-300 rounded-full hover:bg-cyan-300 hover:text-blue-900 transition-all duration-300 font-medium text-xs whitespace-nowrap flex-shrink-0"
        >
          Join Us Now
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col items-center justify-center w-6 h-6 space-y-1 flex-shrink-0"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}

      <DrawerNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        openSubmenu={openSubmenu}
        setOpenSubmenu={setOpenSubmenu}
      />
      <BottomNavigation className="md:hidden" />
    </header>
  );
};

export default Header;
