import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    { name: "HOME", href: "/" },
    {
      name: "SHOP",
      href: "/product-list",
      dropdown: [
        { name: "All Products", href: "/product-list" },
        { name: "Vegetables", href: "/product-list" },
        { name: "Fruits", href: "/product-list" },
        { name: "Fresh Meat", href: "/product-list" },
      ],
    },
    // {
    //   name: "BLOG",
    //   href: "/blog",
    //   dropdown: [
    //     { name: "Blog List", href: "/blog" },
    //     { name: "Blog Details", href: "/blog/1" },
    //   ],
    // },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  // Helper for active link styling
  const activeClass = ({ isActive }) =>
    `flex items-center font-semibold transition-colors duration-200 ${
      isActive
        ? "text-(--color-primary)"
        : "text-gray-700 hover:text-(--color-primary-hover)"
    }`;

  return (
    <>
      {/* --- DESKTOP NAVIGATION --- */}
      <nav className="hidden lg:flex items-center space-x-10">
        {navItems.map((item) => (
          <div
            key={item.name}
            className="relative group" // Using group for hover effects
            onMouseEnter={() => setOpenDropdown(item.name)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <NavLink to={item.href} className={activeClass}>
              {item.name}
              {item.dropdown && (
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform duration-200 ${
                    openDropdown === item.name ? "rotate-180" : ""
                  }`}
                />
              )}
            </NavLink>

            {/* Desktop Dropdown */}
            {item.dropdown && (
              <div
                className={`absolute top-full left-0 pt-4 w-52 transition-all duration-300 ${
                  openDropdown === item.name
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-2"
                }`}
              >
                <div className="bg-white shadow-xl rounded-xl border border-gray-100 py-3 z-50 overflow-hidden">
                  {item.dropdown.map((subItem) => (
                    <NavLink
                      key={subItem.name}
                      to={subItem.href}
                      className="block px-5 py-2.5 text-sm text-black hover:bg-green-50 hover:text-(--color-primary-hover) transition-colors"
                    >
                      {subItem.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* --- MOBILE NAVIGATION (Sidebar/Drawer) --- */}
      {/* This section only shows when isMenuOpen is true (Mobile view) */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Dark Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar Content */}
        <div
          className={`absolute top-0 left-0 w-[280px] h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Menu</h2>

            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <div
                    className="flex justify-between items-center py-2 border-b border-gray-50"
                    onClick={() =>
                      item.dropdown &&
                      setOpenDropdown(
                        openDropdown === item.name ? null : item.name
                      )
                    }
                  >
                    <NavLink
                      to={item.href}
                      className="text-gray-800 font-medium"
                      onClick={() => !item.dropdown && setIsMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                    {item.dropdown && (
                      <ChevronRight
                        size={18}
                        className={`text-gray-400 transition-transform ${
                          openDropdown === item.name ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </div>

                  {/* Mobile Dropdown (Accordion style) */}
                  {item.dropdown && openDropdown === item.name && (
                    <div className="bg-gray-50 mt-2 rounded-lg py-2 pl-4">
                      {item.dropdown.map((subItem) => (
                        <NavLink
                          key={subItem.name}
                          to={subItem.href}
                          className="block py-2 text-sm text-gray-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
