import React, { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, Heart } from "lucide-react";
import { Link } from "react-router-dom"; // Use Link for faster navigation
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import TopBar from "./Topbar";
import Logo from "../assets/logo/52-bazaar-logo.webp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(3); // Example count
  const [cartTotal] = useState(850.0);

  // Effect to handle shadow change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      {/* 1. Top Bar */}
      <TopBar />

      {/* 2. Main Header Container */}
      <div className="border-b border-gray-100">
        {/* Consistent max-w-7xl to fix the "extra width" issue and align with TopBar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            {/* --- Logo Section --- */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <img
                  src={Logo}
                  alt="52bazaar Logo"
                  className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* --- Navigation Section (Centered) --- */}
            <div className="hidden lg:flex flex-grow justify-center">
              <Navigation
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>

            {/* --- Action Icons Section --- */}
            <div className="flex items-center space-x-2 sm:space-x-5">
              {/* Search Button */}
              <button
                className="p-2 text-gray-600 hover:text-(--color-primary-hover) transition-colors hidden md:block"
                title="Search"
              >
                <Search size={22} strokeWidth={2} />
              </button>

              {/* Wishlist Button */}
              <button
                className="p-2 text-gray-600 hover:text-(--color-primary-hover) transition-colors hidden sm:block relative"
                title="Wishlist"
              >
                <Heart size={22} strokeWidth={2} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-(--color-primary) rounded-full border-2 border-white"></span>
              </button>

              {/* Shopping Cart Button */}
              <Link
                to="/cart"
                className="flex items-center space-x-3 group py-2 px-1 sm:px-3 rounded-full hover:bg-green-50 transition-all duration-300"
              >
                <div className="relative">
                  <ShoppingCart
                    size={24}
                    className="text-gray-700 group-hover:text-(--color-primary-hover)transition-colors"
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-(--color-primary) text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-in fade-in zoom-in">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden md:flex flex-col items-start leading-none">
                  <span className="text-[10px] text-(--color-primary) font-bold uppercase tracking-wider">
                    Your Cart
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open Menu"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Menu Component */}
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </header>
  );
};

export default Header;
