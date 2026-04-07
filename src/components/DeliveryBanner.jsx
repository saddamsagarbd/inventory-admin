import React from "react";

export default function DeliveryBanner() {
  return (
    <div className="block mx-auto max-w-screen-2xl">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
        <div className="lg:p-16 p-6 bg-(--color-primary) shadow-sm border text-black rounded-lg">
          <div className="w-full bg-white shadow-sm lg:px-10 lg:py-5 p-6 rounded-lg">
            <div className="flex justify-between items-center">
              {/* Text Content */}
              <div className="lg:w-3/5">
                <span className="text-base lg:text-lg text-gray-700">
                  Organic Products and Food
                </span>
                <h2 className="text-lg lg:text-2xl font-bold mb-1 text-gray-900">
                  Quick Delivery to Your Home
                </h2>
                <p className="text-sm font-sans leading-6 text-gray-600">
                  There are many products you will find in our shop, Choose your
                  daily necessary product from our KachaBazar shop and get some
                  special offers. See Our latest discounted products from here
                  and get a special discount.
                </p>
                <a
                  className="lg:w-1/3 text-xs font-medium inline-block mt-5 px-8 py-3 bg-(--color-primary) text-center text-white rounded-full hover:bg-(--color-primary) transition-colors duration-300"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download App
                </a>
              </div>

              {/* Image */}
              <div className="w-1/5 flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-end">
                <img
                  src="https://res.cloudinary.com/ahossain/image/upload/v1697688032/settings/delivery-boy_rluuoq.webp"
                  alt="Quick Delivery to Your Home"
                  className="block w-auto object-contain max-w-full h-auto"
                  width="373"
                  height="250"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
