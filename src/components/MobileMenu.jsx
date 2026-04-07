import { X, ChevronDown } from "lucide-react";
import { useState } from "react";
import Logo from "../assets/logo/52-bazaar-logo.webp";
const MobileMenu = ({ isOpen, setIsOpen }) => {
  const [openSection, setOpenSection] = useState(null);

  const menuItems = [
    { name: "HOME", href: "/" },
    {
      name: "SHOP",
      href: "/shop",
      subItems: [
        "All Products",
        "Vegetables",
        "Fruits",
        "Fresh Meat",
        "Fast Food",
      ],
    },
    // {
    //   name: "BLOG",
    //   href: "/blog",
    //   subItems: ["Blog List", "Blog Details"],
    // },
    // {
    //   name: "PAGES",
    //   href: "#",
    //   subItems: ["About Us", "Contact", "FAQs", "Terms & Conditions"],
    // },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-white">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <img src={Logo} alt="Logo" className="w-12 h-auto" />
          <button onClick={() => setIsOpen(false)} className="p-2">
            <X className="w-6 h-6" color="red" />
          </button>
        </div>

        <div className="space-y-4">
          {menuItems.map((item) => (
            <div key={item.name}>
              <div className="flex justify-between items-center">
                <a
                  href={item.href}
                  className="text-green-700 font-medium hover:text-green-600"
                >
                  {item.name}
                </a>
                {item.subItems && (
                  <button
                    onClick={() =>
                      setOpenSection(
                        openSection === item.name ? null : item.name
                      )
                    }
                    className="p-2"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openSection === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>

              {item.subItems && openSection === item.name && (
                <div className="mt-2 ml-4 space-y-2">
                  {item.subItems.map((subItem) => (
                    <a
                      key={subItem}
                      href="#"
                      className="block text-sm text-gray-600 hover:text-green-600"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MobileMenu;
