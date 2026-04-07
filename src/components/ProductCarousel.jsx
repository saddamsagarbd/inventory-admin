import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      category: "Fresh Fruits",
      bgColor: "from-orange-400 to-red-400",
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80",
      accent: "orange",
    },
    {
      id: 2,
      category: "Vegetables",
      bgColor: "from-green-400 to-emerald-500",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
      accent: "green",
    },
    {
      id: 3,
      category: "Berries",
      bgColor: "from-pink-400 to-purple-500",
      image:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80",
      accent: "pink",
    },
    {
      id: 4,
      category: "Organic",
      bgColor: "from-lime-400 to-green-500",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
      accent: "lime",
    },
    {
      id: 5,
      category: "Tropical",
      bgColor: "from-yellow-400 to-orange-400",
      image:
        "https://images.unsplash.com/photo-1587334207836-f6c3f6b97ca8?w=800&q=80",
      accent: "yellow",
    },
    {
      id: 6,
      category: "Citrus",
      bgColor: "from-amber-400 to-yellow-500",
      image:
        "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&q=80",
      accent: "amber",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const getVisibleSlides = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % slides.length;
      visible.push({ ...slides[index], position: i });
    }
    return visible;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const visibleSlides = getVisibleSlides();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Fresh & Organic
          </h1>
          <p className="text-xl text-gray-600">
            Discover our premium selection of nature's finest
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleSlides.map((slide) => (
              <div
                key={`${slide.id}-${slide.position}`}
                className="group relative h-96 rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                style={{
                  animation: `fadeIn 0.6s ease-out ${
                    slide.position * 0.1
                  }s both`,
                }}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} opacity-90`}
                />

                {/* Image */}
                <img
                  src={slide.image}
                  alt={slide.category}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Animated Circles */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl animate-pulse" />
                <div
                  className="absolute bottom-8 left-8 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                    <h3 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                      {slide.category}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-12 bg-white rounded-full" />
                      <span className="text-white/90 text-sm font-medium">
                        Explore Collection
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-12 h-3 bg-(--color-primary) hover:bg-(--color-primary-hover) hover:w-16 hover:h-4"
                  : "w-3 h-3 bg-gray-400 hover:bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play Toggle */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="px-6 py-2 bg-white rounded-full shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300"
          >
            {isAutoPlaying ? "Pause" : "Play"} Auto-scroll
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
