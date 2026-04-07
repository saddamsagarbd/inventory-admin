import { Link } from "react-router-dom";
import Logo from "../../assets/logo/52-bazaar-logo.webp";
import { Bell, Search, ShoppingCart, User } from "lucide-react";

const MainHeader = ({ cartCount = 2 }) => {
  return (
    <header className="bg-(--color-primary) shadow">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
        <div className="relative flex h-20 justify-between items-center">
          {/* Logo - Only visible on large screens */}
          <div className="hidden lg:flex items-center">
            <Link to="/" className="flex items-center group">
              <img
                src={Logo}
                alt="52bazaar Logo"
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Search Bar - Visible on ALL screens, but centered on mobile */}
          <div className="w-full lg:flex-1 max-w-3xl mx-auto lg:mx-8">
            <div className="relative w-full bg-white rounded-md">
              <input
                type="text"
                placeholder="Search for products (e.g. shirt, pant)"
                className="w-full pl-5 pr-12 py-3 rounded-md text-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-(--color-primary) text-sm"
              />
              <button className="absolute right-0 top-0 h-full px-4 cursor-pointer text-gray-400 hover:text-(--color-primary)">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Icons - Only visible on large screens */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative text-white cursor-pointer hover:text-gray-200"
            >
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
              <ShoppingCart className="w-6 h-6" />
            </Link>

            <button className="text-white cursor-pointer hover:text-gray-200">
              <Bell className="w-6 h-6" />
            </button>

            <span className="h-6 w-px bg-gray-200"></span>

            <Link to="/login" className="text-white hover:text-gray-200">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default MainHeader;
