import React from "react";
import { ChevronRight } from "lucide-react";

export default function FeaturedCategories() {
  const categories = [
    {
      id: 1,
      name: "sai",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png",
      subcategories: [],
    },
    {
      id: 2,
      name: "Fish & Meat",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/carp-fish_paxzrt.png",
      subcategories: ["Fish", "Meat"],
    },
    {
      id: 3,
      name: "Fruits & Vegetable",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340704/category%20icon/cabbage_n59uv3.png",
      subcategories: ["Baby Food", "Fresh Fruits", "Dry Fruits"],
    },
    {
      id: 4,
      name: "Biscuits & Cakes",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/cookie_1_ugipqa.png",
      subcategories: ["Biscuits", "Cakes"],
    },
    {
      id: 5,
      name: "Household Tools",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340706/category%20icon/spray_pebsjt.png",
      subcategories: ["Water Filter", "Cleaning Tools", "Pest Control"],
    },
    {
      id: 6,
      name: "Pet Care",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340707/category%20icon/cat_tznwmq.png",
      subcategories: ["Dog Care", "Cat Care"],
    },
    {
      id: 7,
      name: "Beauty & Healths",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340706/category%20icon/beauty_vfbmzc.png",
      subcategories: ["Women", "Men"],
    },
    {
      id: 8,
      name: "Jam & Jelly",
      icon: "https://i.postimg.cc/rmLvfsMC/strawberry-jam-1.png",
      subcategories: [],
    },
    {
      id: 9,
      name: "Milk & Dairy",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340706/category%20icon/milk_dcl0dr.png",
      subcategories: ["Butter & Ghee", "Ice Cream", "Dairy"],
    },
    {
      id: 10,
      name: "Drinks",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/juice_p5gv5k.png",
      subcategories: ["Tea", "Water", "Juice"],
    },
    {
      id: 11,
      name: "Breakfast",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/bagel_mt3fod.png",
      subcategories: ["Bread", "Cereal"],
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-zinc-800 py-10 lg:py-16">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        {/* Header */}
        <div className="mb-10 flex justify-center">
          <div className="text-center w-full lg:w-2/5">
            <h2 className="text-xl lg:text-2xl mb-2 font-semibold text-gray-900 dark:text-white">
              Featured Categories
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-6">
              Choose your necessary products from this feature categories.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-0">
          {categories.map((category) => (
            <li key={category.id} className="group">
              <div className="flex w-full h-full border border-gray-100 dark:border-gray-950 shadow-sm bg-white dark:bg-zinc-900 p-4 cursor-pointer transition duration-200 ease-linear transform hover:shadow-lg">
                <div className="flex items-start w-full">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-9 h-9 object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="pl-4 flex-1 min-w-0">
                    <h3 className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-(--color-primary) font-medium leading-tight line-clamp-1 transition-colors">
                      {category.name}
                    </h3>

                    {/* Subcategories */}
                    {category.subcategories.length > 0 && (
                      <ul className="pt-1 mt-1">
                        {category.subcategories.map((sub, idx) => (
                          <li key={idx} className="pt-1">
                            <a className="flex items-center text-xs text-gray-400 cursor-pointer hover:translate-x-2 transition-transform duration-300 group/item">
                              <ChevronRight className="w-3 h-3 flex-shrink-0" />
                              <span className="ml-1">{sub}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
