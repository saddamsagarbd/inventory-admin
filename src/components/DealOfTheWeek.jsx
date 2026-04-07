import React, { useState, useEffect } from "react";
import { Heart, Package, Handshake, Truck, Sparkles } from "lucide-react";

export default function DealOfTheWeek() {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 1,
    minutes: 1,
    seconds: 41,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          return { days: 6, hours: 1, minutes: 1, seconds: 41 };
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Heart,
      title: "Eat Healthier",
      description: "Fresh organic produce delivered to your doorstep daily",
      color: "from-red-400 to-pink-500",
    },
    {
      icon: Handshake,
      title: "We Have Brands",
      description: "Trusted premium brands you know and love",
      color: "from-blue-400 to-indigo-500",
    },
  ];

  const rightFeatures = [
    {
      icon: Package,
      title: "Fresh And Clean Products",
      description: "Carefully selected and quality checked items",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery available in your area",
      color: "from-orange-400 to-amber-500",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-4 lg:px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-(--color-primary) text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Limited Time Offer
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Deal Of The Week
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't miss out on our exclusive weekly deal - premium quality at
            unbeatable prices
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Features */}
          <div className="space-y-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right group"
              >
                <div className="order-2 sm:order-1 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div
                  className={`order-1 sm:order-2 flex-shrink-0 w-16 h-16 bg-(--color-primary) rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>

          {/* Center - Product Image */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md mx-auto">
              {/* Animated Background Circles */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-emerald-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              <div
                className="absolute inset-0 bg-gradient-to-tr from-lime-200 to-green-100 rounded-full blur-2xl opacity-30 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* Product Image Container */}
              <div className="relative z-10 aspect-square flex items-center justify-center p-4">
                <div className="relative w-full h-full rounded-full overflow-hidden group">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-full"></div>

                  {/* Product Image */}
                  <img
                    src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80"
                    alt="Fresh Vegetable Basket"
                    className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div>
                </div>
              </div>

              {/* Discount Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-(--color-primary) text-white rounded-full px-6 py-2 shadow-xl z-20 animate-bounce">
                <span className="text-sm font-bold">40% OFF</span>
              </div>

              {/* Price Tag */}
              <div className="absolute top-8 right-4 sm:right-8 bg-white rounded-2xl shadow-2xl px-5 py-3 z-20 transform hover:scale-105 transition-transform">
                <div className="text-xs text-gray-500 mb-1">Special Price</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-gray-400 line-through">
                    $32.00
                  </span>
                  <span className="text-2xl font-bold text-(--color-primary)">
                    $19.00
                  </span>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="absolute bottom-8 left-4 sm:left-8 bg-white rounded-2xl shadow-xl px-4 py-2 z-20 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">4.9</span>
              </div>
            </div>
          </div>

          {/* Right Features */}
          <div className="space-y-10">
            {rightFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left group"
              >
                <div
                  className={`flex-shrink-0 w-16 h-16 bg-(--color-primary) rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-lg font-semibold text-gray-700">
              Hurry! Offer ends in:
            </p>
          </div>
          <div className="flex justify-center gap-3 sm:gap-4">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" },
            ].map((item, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-xl px-5 py-4 sm:px-7 sm:py-6 text-center min-w-[80px] sm:min-w-[100px] transform hover:scale-105 transition-transform"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-2xl"></div>
                <div className="relative">
                  <div className="text-3xl sm:text-5xl font-bold bg-(--color-primary) bg-clip-text text-transparent">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-2 font-semibold uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8">
            <button className="bg-(--color-primary) hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-10 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300">
              Grab This Deal Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
