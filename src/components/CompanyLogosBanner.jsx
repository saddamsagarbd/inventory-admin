import React from "react";
import { Leaf } from "lucide-react";

export default function CompanyLogosBanner() {
  // Array of logo placeholders
  const logos = [
    { id: 1, name: "Vegan Logo 1" },
    { id: 2, name: "Natural Organic 100%" },
    { id: 3, name: "Vegan Logo 2" },
    { id: 4, name: "Natural Organic 100%" },
    { id: 5, name: "Vegan Logo 3" },
    { id: 6, name: "Vegan Logo 4" },
  ];

  return (
    <div className="w-full bg-gray-50 py-8 sm:py-2 lg:py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12 items-center">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              {/* Logo Placeholder */}
              <div className="text-center">
                {logo.id % 2 === 0 ? (
                  // Natural Organic Style
                  <div className="flex flex-col items-center">
                    <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 mb-2" />
                    <div className="text-xs sm:text-sm font-light text-gray-400 uppercase tracking-wider">
                      Natural
                    </div>
                    <div className="text-xs sm:text-sm font-light text-gray-400 uppercase tracking-wider">
                      Organic
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-400 mt-1">
                      100%
                    </div>
                  </div>
                ) : (
                  // Vegan Style
                  <div className="flex flex-col items-center">
                    <Leaf className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-2" />
                    <div className="text-sm sm:text-base font-bold text-gray-400 uppercase tracking-widest">
                      Vegan
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
