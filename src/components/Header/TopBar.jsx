import React, { useState } from "react";
import {
  Phone,
  User,
  ShoppingCart,
  Bell,
  Search,
  ChevronDown,
  Menu,
  Home,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

// Top Bar Component
const TopBar = () => {
  return (
    <div className="hidden lg:block bg-gray-100">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
        <div className="text-gray-700 py-2 font-sans text-xs font-medium flex justify-between items-center">
          <span className="flex items-center">
            <Phone className="mr-2 w-4 h-4" />
            We are available 24/7, Need help?
            <a
              href="tel:+099949343"
              className="font-bold text-(--color-primary) ml-1"
            >
              +099949343
            </a>
          </span>
          <div className="lg:text-right flex items-center">
            <Link
              className="font-medium hover:text-(--color-primary-hover)"
              to="/about-us"
            >
              About Us
            </Link>
            <span className="mx-2">|</span>
            <Link
              className="font-medium text-black hover:text-(--color-primary-hover)"
              to="/contact-us"
            >
              Contact Us
            </Link>
            <span className="mx-2">|</span>
            <Link
              className="font-medium hover:text-(--color-primary-hover)"
              to="/my-account"
            >
              My Account
            </Link>
            <span className="mx-2">|</span>
            <Link
              className="flex items-center font-medium hover:text-(--color-primary-hover)"
              to="/login"
            >
              <User className="mr-1 w-4 h-4" />
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
