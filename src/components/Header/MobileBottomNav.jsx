import { ChevronRight, Home, Menu, ShoppingCart, User, X } from "lucide-react";
import Logo from "../../assets/logo/52-bazaar-logo.webp";
import { useState } from "react";
import { Link } from "react-router-dom";

const MobileBottomNav = ({ cartCount = 2 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("category");

  const categories = [
    {
      name: "sai",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png",
      hasSubmenu: false,
    },
    {
      name: "Fish & Meat",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/carp-fish_paxzrt.png",
      hasSubmenu: true,
    },
    {
      name: "Fruits & Vegetable",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340704/category%20icon/cabbage_n59uv3.png",
      hasSubmenu: true,
    },
    {
      name: "Biscuits & Cakes",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/cookie_1_ugipqa.png",
      hasSubmenu: true,
    },
    {
      name: "Household Tools",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340706/category%20icon/spray_pebsjt.png",
      hasSubmenu: true,
    },
    {
      name: "Pet Care",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340707/category%20icon/cat_tznwmq.png",
      hasSubmenu: true,
    },
    {
      name: "Beauty & Healths",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340706/category%20icon/beauty_vfbmzc.png",
      hasSubmenu: true,
    },
    {
      name: "Jam & Jelly",
      icon: "https://i.postimg.cc/rmLvfsMC/strawberry-jam-1.png",
      hasSubmenu: false,
    },
    {
      name: "Milk & Dairy",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340706/category%20icon/milk_dcl0dr.png",
      hasSubmenu: true,
    },
    {
      name: "Drinks",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/juice_p5gv5k.png",
      hasSubmenu: true,
    },
    {
      name: "Breakfast",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/bagel_mt3fod.png",
      hasSubmenu: true,
    },
  ];

  const pages = [
    { name: "About Us", href: "#about" },
    { name: "Contact Us", href: "#contact" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms & Conditions", href: "#terms" },
    { name: "Offers", href: "#offers", highlight: true },
  ];
  console.log("cartCount:", cartCount);
  console.log("menuOpen:", menuOpen);

  return (
    <>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="sm:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-full max-w-xs bg-white shadow-xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-5 pb-1">
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 -m-2 rounded-md text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center px-2">
                <img
                  src={Logo}
                  alt="Kachabazar"
                  className="h-12 w-auto"
                  onClick={() => setMenuOpen(false)}
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mt-1">
              <div className="flex px-4">
                <button
                  onClick={() => setActiveTab("category")}
                  className={`flex-1 px-1 py-4 text-base font-medium border-b-2 transition-colors ${
                    activeTab === "category"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-900"
                  }`}
                >
                  Category
                </button>
                <button
                  onClick={() => setActiveTab("pages")}
                  className={`flex-1 px-1 py-4 text-base font-medium border-b-2 transition-colors ${
                    activeTab === "pages"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-900"
                  }`}
                >
                  Pages
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {activeTab === "category" && (
                <div className="space-y-1">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="p-2 flex items-center justify-between rounded-md hover:bg-gray-50 cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <img
                          src={category.icon}
                          alt={category.name}
                          className="w-5 h-5 object-contain flex-shrink-0"
                        />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-(--color-primary) transition-colors">
                          {category.name}
                        </span>
                      </div>
                      {category.hasSubmenu && (
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-(--color-primary) transition-colors flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "pages" && (
                <div className="space-y-1">
                  {pages.map((page, index) => (
                    <a
                      key={index}
                      href={page.href}
                      className={`block p-3 rounded-md text-base font-medium transition-colors ${
                        page.highlight
                          ? "text-red-500 hover:text-(--color-primary) hover:bg-gray-50"
                          : "text-gray-700 hover:text-(--color-primary) hover:bg-gray-50"
                      }`}
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="sm:hidden fixed z-30 bottom-0 left-0 right-0 bg-(--color-primary) shadow-lg">
        <div className="flex items-center justify-around h-16 px-4">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-center justify-center text-white hover:text-white/80 transition-colors"
          >
            <Menu className="w-6 h-6" />
            <span className="text-xs mt-1">Menu</span>
          </button>

          <Link
            to="/"
            className="flex flex-col items-center justify-center text-white hover:text-white/80 transition-colors"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            to="/cart"
            className="flex flex-col items-center justify-center text-white hover:text-white/80 transition-colors relative"
          >
            {cartCount > 0 && (
              <span className="absolute -top-1 right-1/4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs mt-1">Cart</span>
          </Link>

          <Link
            to="/login"
            className="flex flex-col items-center justify-center text-white hover:text-white/80 transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Account</span>
          </Link>
        </div>
      </div>
    </>
  );
};
export default MobileBottomNav;
