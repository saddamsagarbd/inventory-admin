import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper modules
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import FeatureBg3 from "../../src/assets/category/cta-bg-3.webp";
import FeatureBg2 from "../../src/assets/category/cta-bg-2.webp";
import FeatureBg1 from "../../src/assets/category/cta-bg-1.webp";

const CategorySlider = () => {
  const categories = [
    {
      name: "Breakfast",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/bagel_mt3fod.png",
    },
    {
      name: "Snacks",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png",
    },
    {
      name: "Fish & Meat",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/carp-fish_paxzrt.png",
    },
    {
      name: "Fruits & Vegetable",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340704/category%20icon/cabbage_n59uv3.png",
    },
    {
      name: "Biscuits & Cakes",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/cookie_1_ugipqa.png",
    },
    {
      name: "Household Tools",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340706/category%20icon/spray_pebsjt.png",
    },
    {
      name: "Pet Care",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340707/category%20icon/cat_tznwmq.png",
    },
    {
      name: "Beauty & Healths",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340706/category%20icon/beauty_vfbmzc.png",
    },
    {
      name: "Jam & Jelly",
      icon: "https://i.postimg.cc/rmLvfsMC/strawberry-jam-1.png",
    },
    {
      name: "Milk & Dairy",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340706/category%20icon/milk_dcl0dr.png",
    },
    {
      name: "Drinks",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/juice_p5gv5k.png",
    },
  ];

  const featureCards = [
    {
      title: "Fresh & Natural",
      subtitle: "Taste of",
      description: "Weekend discount offer",
      image: FeatureBg1,
      link: "/search?category=fresh-vegetable",
      textColor: "text-emerald-900",
    },
    {
      title: "Fish & Meat",
      subtitle: "Taste of",
      description: "Weekend discount offer",
      image: FeatureBg2,
      link: "/search?Category=fish--meat",
      textColor: "text-red-900",
    },
    {
      title: "Bread & Bakery",
      subtitle: "Taste of",
      description: "Weekend discount offer",
      image: FeatureBg3,
      link: "/search?Category=biscuits--cakes",
      textColor: "text-orange-900",
    },
  ];

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-10 py-10 font-sans">
      {/* --- FEATURE CARDS SECTION --- */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {featureCards.map((card, index) => (
          <div
            key={index}
            className="group relative h-48 sm:h-56 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Background Image */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-300 flex flex-col justify-center p-6 sm:p-8">
              <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                {card.subtitle}
              </h2>
              <span
                className={`text-xl sm:text-2xl font-bold mt-1 ${card.textColor}`}
              >
                {card.title}
              </span>
              <p className="text-sm text-gray-600 mt-1 mb-4">
                {card.description}
              </p>
              <a
                href={card.link}
                className="inline-block w-max px-5 py-2 bg-(--color-primary) text-white text-xs font-bold rounded-full hover:bg-(--color-primary-hover) transition-colors"
              >
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* --- CATEGORY SLIDER SECTION --- */}
      <div className="relative group">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Explore Categories
        </h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={15}
          slidesPerView={2}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 3 },
            640: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 7 },
            1280: { slidesPerView: 8 },
          }}
          className="category-swiper"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-transparent hover:border-(--color-primary-hover) hover:bg-white hover:shadow-sm transition-all cursor-pointer group/item">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover/item:scale-110 transition-transform">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="text-[11px] sm:text-xs font-semibold text-gray-700 text-center whitespace-nowrap group-hover/item:text-(--color-primary-hover)">
                  {category.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-(--color-primary) shadow-xl rounded-full flex items-center justify-center text-gray-400 hover:text-(--color-primary) disabled:opacity-0 transition-all">
          <ChevronLeft size={24} color="white" />
        </button>
        <button className="swiper-button-next-custom absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-(--color-primary) shadow-xl rounded-full flex items-center justify-center text-gray-400 hover:text-(--color-primary) disabled:opacity-0 transition-all">
          <ChevronRight size={24} color="white" />
        </button>
      </div>
    </div>
  );
};

export default CategorySlider;
