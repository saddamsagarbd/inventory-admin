import React, { useState, useEffect } from "react";

const GroceryHeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [countdown1, setCountdown1] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    days: 0,
  });
  const [countdown2, setCountdown2] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    days: 0,
  });

  const slides = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/ahossain/image/upload/v1697688491/settings/slider-1_rl8qdc.jpg",
      title: "The Best Quality Products Guaranteed!!!",
      description: "The Best Quality Products Guaranteed!!!",
      buttonText: "Buy Now",
      category: "milk-dairy",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/ahossain/image/upload/v1697688491/settings/slider-2_o6aezc.jpg",
      title: "Best Different Type of Grocery Store",
      description:
        "Quickly aggregate empowered networks after emerging products...",
      buttonText: "Buy Now",
      category: "fish-meat",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/ahossain/image/upload/v1697688492/settings/slider-3_iw4nnf.jpg",
      title: "Quality Freshness Guaranteed!",
      description:
        "Intrinsicly fashion performance based products rather than accurate benefits...",
      buttonText: "Buy Now",
      category: "fruits-vegetable",
    },
    {
      id: 4,
      image: "https://i.postimg.cc/rscqZJNz/slider-1.webp",
      title: "The Best Quality Products Guaranteed!",
      description:
        "Dramatically facilitate effective total linkage for go forward processes...",
      buttonText: "Shop Now",
      category: "fruits-vegetable",
    },
    {
      id: 5,
      image:
        "https://res.cloudinary.com/ahossain/image/upload/v1697688491/settings/slider-2_o6aezc.jpg",
      title: "Best Different Type of Grocery Store",
      description:
        "Quickly aggregate empowered networks after emerging products...",
      buttonText: "Shop Now",
      category: "fish-meat",
    },
  ];

  const coupons = [
    {
      id: 1,
      image: "https://i.ibb.co/PDLPDHC/ins1.jpg",
      discount: "50%",
      title: "August Gift Voucher",
      code: "AUGUST24",
      minAmount: 100,
      status: "Inactive",
    },
    {
      id: 2,
      image: "https://i.ibb.co/4thS4Z1/ins2.jpg",
      discount: "10%",
      title: "Summer Gift Voucher",
      code: "SUMMER24",
      minAmount: 1000,
      status: "Inactive",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
      <div className="flex w-full gap-6">
        {/* Left Side - Carousel */}
        <div className="shrink-0 w-full lg:w-3/5">
          <div className="relative h-75 rounded-lg overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === activeSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 z-10 flex flex-col w-full h-full place-items-start justify-center">
                  <div className="pl-4 pr-4 sm:pl-10 sm:pr-16 w-10/12 lg:w-8/12 xl:w-7/12">
                    <h1 className="mb-2 text-xl sm:text-sm md:text-2xl lg:text-2xl font-semibold text-gray-800">
                      {slide.title}
                    </h1>
                    <p className="text-base leading-6 text-gray-600 font-sans line-clamp-2">
                      {slide.description}
                    </p>
                    <button className="hidden sm:inline-block lg:inline-block text-sm leading-6 font-medium mt-6 px-6 py-2 bg-(--color-primary) text-center rounded-md text-white hover:bg-(--color-primary)">
                      {slide.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Buttons */}
            {/* <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button> */}

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeSlide
                      ? "bg-(--color-primary) w-8"
                      : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Coupons */}
        <div className="w-full hidden lg:block lg:w-2/5">
          <div className="bg-gray-50 h-full border-2 border-orange-500 rounded shadow">
            <div className="bg-orange-100 text-gray-900 px-6 py-2 rounded-t flex items-center justify-center">
              <h3 className="text-base font-medium">
                Latest Super Discount Active Coupon Code
              </h3>
            </div>
            <div className="overflow-hidden bg-white">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="coupon mx-4 my-5 flex justify-between items-center bg-white rounded-md shadow"
                >
                  <div className="py-2 px-3 flex items-center justify-items-start">
                    <figure>
                      <img
                        src={coupon.image}
                        alt={coupon.title}
                        className="rounded-lg w-24 h-24 object-cover"
                      />
                    </figure>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <h6 className="pl-1 text-base font-medium text-gray-600">
                          <span className="text-xl text-red-500 font-bold">
                            {coupon.discount}
                          </span>{" "}
                          Off
                        </h6>
                        <div className="ml-2">
                          <span className="text-red-600 inline-block px-4 py-1 rounded-full font-medium text-xs bg-red-100">
                            {coupon.status}
                          </span>
                        </div>
                      </div>
                      <h2 className="pl-1 text-base text-gray-700 leading-6 font-semibold mb-2">
                        {coupon.title}
                      </h2>
                      <span className="inline-block mb-2">
                        <div className="flex items-center font-semibold">
                          <span className="flex items-center justify-center bg-red-500 text-white text-sm font-semibold mx-1 px-2 py-1 rounded">
                            00
                          </span>
                          :
                          <span className="flex items-center justify-center bg-red-500 text-white text-sm font-semibold mx-1 px-2 py-1 rounded">
                            00
                          </span>
                          :
                          <span className="flex items-center justify-center bg-red-500 text-white text-sm font-semibold mx-1 px-2 py-1 rounded">
                            00
                          </span>
                          :
                          <span className="flex items-center justify-center bg-red-500 text-white text-sm font-semibold mx-1 px-2 py-1 rounded">
                            00
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="border-l-2 border-dashed w-1/3 relative px-4">
                    <div className="info flex items-center">
                      <div className="w-full">
                        <div className="block">
                          <div className="border border-dashed bg-emerald-50 py-1 border-emerald-300 rounded-lg text-center block">
                            <button className="block w-full">
                              <span className="uppercase font-semibold text-sm leading-7 text-(--color-primary)">
                                {coupon.code}
                              </span>
                            </button>
                          </div>
                        </div>
                        <p className="text-xs leading-4 text-gray-500 mt-2">
                          * This coupon apply when shopping more then{" "}
                          <span className="font-bold">${coupon.minAmount}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl">
              <span className="text-(--color-primary) font-bold">
                100% Natural Quality Organic Product
              </span>
            </h1>
            <p className="text-gray-500">
              See Our latest discounted products from here and get a special
              discount product
            </p>
          </div>
          <button className="text-sm font-medium cursor-pointer px-6 py-2 bg-(--color-primary) text-center rounded-full text-white hover:bg-(--color-primary-hover)">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroceryHeroSection;
