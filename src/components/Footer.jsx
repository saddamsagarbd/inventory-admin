import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronUp,
} from "lucide-react";
import { CompanyInfo } from "./CompanyInfo";
import { Newsletter } from "./Newsletter";

// Company Info Component
// export function CompanyInfo() {
//   return (
//     <div className="space-y-4">
//       {/* Logo Placeholder */}
//       <div className="flex items-center gap-2 mb-6">
//         <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//           <span className="text-white font-bold text-sm">O</span>
//         </div>
//         <span className="text-2xl font-bold text-gray-900">gami</span>
//       </div>

//       {/* Contact Information */}
//       <div className="space-y-3 text-gray-600">
//         <p className="text-sm">
//           <span className="font-semibold">Address:</span> 60-49 Road 11378 New
//           York
//         </p>
//         <p className="text-sm">
//           <span className="font-semibold">Phone:</span> +65 11.188.888
//         </p>
//         <p className="text-sm">
//           <span className="font-semibold">Email:</span>{" "}
//           info.deercreative@gmail.com
//         </p>
//       </div>

//       {/* Social Media Icons */}
//       <div className="flex gap-3 pt-4">
//         <button className="w-10 h-10 bg-gray-100 hover:bg-green-500 hover:text-white rounded-full flex items-center justify-center transition-colors duration-300">
//           <Facebook className="w-4 h-4" />
//         </button>
//         <button className="w-10 h-10 bg-gray-100 hover:bg-green-500 hover:text-white rounded-full flex items-center justify-center transition-colors duration-300">
//           <Twitter className="w-4 h-4" />
//         </button>
//         <button className="w-10 h-10 bg-gray-100 hover:bg-green-500 hover:text-white rounded-full flex items-center justify-center transition-colors duration-300">
//           <Linkedin className="w-4 h-4" />
//         </button>
//         <button className="w-10 h-10 bg-gray-100 hover:bg-green-500 hover:text-white rounded-full flex items-center justify-center transition-colors duration-300">
//           <Instagram className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// }

// Footer Links Component
export function FooterLinks() {
  const linkSections = [
    {
      title: "INFORMATION",
      links: ["About us", "Check out", "Contact", "Service"],
    },
    {
      title: "MY ACCOUNT",
      links: ["My Account", "Contact", "Shopping cart", "Shop"],
    },
    {
      title: "QUICK SHOP",
      links: ["About us", "Check out", "Contact", "Service"],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {linkSections.map((section, index) => (
        <div key={index}>
          <h3 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide">
            {section.title}
          </h3>
          <ul className="space-y-3">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-(--color-primary) transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Newsletter Component

// Main Footer Component
export default function Footer() {
  const paymentMethods = [
    "Skrill",
    "Sofort",
    "Amex",
    "PayPal",
    "Master",
    "Visa",
  ];

  return (
    <footer className="w-full bg-white">
      {/* Top Footer Section */}
      <div className="container mx-auto px-4 sm:px-2 lg:px-4 py-12 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Company Info */}
          <div>
            <CompanyInfo />
          </div>

          {/* Footer Links - Takes 3 columns */}
          <div className="lg:col-span-3">
            <FooterLinks />
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Bottom Footer */}
      <div className="bg-gray-50 py-6">
        <div className="container mx-auto px-4 sm:px-4 lg:px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-600 text-center sm:text-left">
              Copyright © 2019 Ogami - All Rights Reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-(--color-primary) transition-colors duration-300"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
