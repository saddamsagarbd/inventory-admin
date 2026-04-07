import { ChevronUp } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email) {
      console.log("Subscribed:", email);
      setEmail("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="bg-gradient-to-r from-(--color-primary) to-(--color-primary-hover) py-8 sm:py-10 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Content */}
          <div className="text-white text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              Join Our Newsletter Now
            </h3>
            <p className="text-sm sm:text-base opacity-90">
              Get E-mail updates about our latest shop and special offers.
            </p>
          </div>

          {/* Newsletter Input */}
          <div className="flex w-full md:w-auto max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your email"
              className="bg-white flex-1 px-4 sm:px-6 py-1 rounded-l-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              onClick={handleSubmit}
              className="bg-white text-(--color-primary) font-semibold px-6 sm:px-8 py-3 rounded-r-full hover:bg-gray-100 transition-colors duration-300 uppercase text-sm tracking-wide"
            >
              Subcribe
            </button>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 w-12 h-12 bg-white text-(--color-primary) rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 shadow-lg"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
}
