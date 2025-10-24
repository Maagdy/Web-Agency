import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { socialMediaIcons } from "../../common/constants/socialIcons.tsx";
import type { NavItem, SubMenuItem } from "../types/types.ts";
import { navItems } from "../../common/constants/navItems.ts";
import { drawerBackground } from "../../common/assets/images/index.ts";

interface DrawerNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  openSubmenu: number | null;
  setOpenSubmenu: React.Dispatch<React.SetStateAction<number | null>>;
}

const DrawerNavigation: React.FC<DrawerNavigationProps> = ({
  isOpen,
  onClose,
  openSubmenu,
  setOpenSubmenu,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (item: NavItem): boolean => {
    return (
      location.pathname === item.path ||
      !!(
        item.submenu &&
        item.submenu.some((sub) => location.pathname === sub.path)
      )
    );
  };

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (path) {
      navigate(path);
      onClose();
    }
  };

  const handleAccordionToggle = (index: number) => {
    setOpenSubmenu((prevState) => (prevState === index ? null : index));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Close Button */}
      {isOpen && (
        <button
          onClick={onClose}
          className="fixed right-72 top-6 z-50 w-10 h-10 flex items-center justify-center text-white hover:rotate-180 transition-all duration-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundImage: `url(${drawerBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
      >
        <div className="flex flex-col justify-between h-full p-4">
          {/* Navigation Items */}
          <div className="space-y-2 mt-16">
            {navItems.map((item: NavItem, index: number) => (
              <div key={item.path || item.label}>
                {item.submenu ? (
                  // Accordion Item
                  <div className="border-none">
                    <button
                      onClick={() => handleAccordionToggle(index)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-full text-left font-medium transition-all duration-200 ${
                        isActive(item)
                          ? "bg-white text-black"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          openSubmenu === index ? "rotate-180" : "rotate-0"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Accordion Content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        openSubmenu === index
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pt-2 pb-0 pl-8 space-y-1">
                        {item.submenu.map((subItem: SubMenuItem) => (
                          <button
                            key={subItem.path}
                            onClick={(e) => handleNavigation(e, subItem.path)}
                            className={`block w-full text-left py-2 px-2 text-sm rounded cursor-pointer transition-all duration-200 ${
                              location.pathname === subItem.path
                                ? "text-white font-bold"
                                : "text-white/60 hover:text-white"
                            }`}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular Menu Item
                  <button
                    onClick={(e) => handleNavigation(e, item.path)}
                    className={`w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer ${
                      location.pathname === item.path
                        ? "bg-white text-black"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}

            {/* Quote Button */}
            <div className="pt-4">
              <button
                onClick={(e) => handleNavigation(e, "/auth")}
                className="w-full px-4 py-3 border-2 border-cyan-300 text-cyan-300 rounded-full hover:bg-cyan-300 hover:text-black transition-all duration-300 font-medium text-sm"
              >
                Join Us Now
              </button>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col-reverse gap-4 mb-10">
            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4">
              {socialMediaIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center text-white rounded-full transition-all duration-300 ${social.hoverColor}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-center text-white/70 text-xs">
              © Copyright 2024
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawerNavigation;
