import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "./../data/index";

// Demo: FeaturedProducts component using ProductCard
const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Vegetables",
    "Fruits",
    "Fish & Meat",
    "Baby Care",
  ];

  // const products = [
  //   {
  //     id: 1,
  //     name: "Mint",
  //     category: "Vegetables",
  //     price: 30.78,
  //     originalPrice: 30.78,
  //     rating: 2.9,
  //     reviews: 7,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738770585/product/Mint-6-5ct-removebg-preview.png",
  //     slug: "mint",
  //   },
  //   {
  //     id: 2,
  //     name: "Clementine",
  //     category: "Fruits",
  //     price: 48.12,
  //     originalPrice: 48.12,
  //     rating: 3.2,
  //     reviews: 10,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738768992/product/Clementine-5ct-removebg-preview.png",
  //     slug: "clementine",
  //   },
  //   {
  //     id: 3,
  //     name: "Yellow Sweet Corn",
  //     category: "Vegetables",
  //     price: 80.97,
  //     originalPrice: 80.97,
  //     rating: 2.6,
  //     reviews: 5,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738769999/product/Yellow-Sw-eet-Corn-Bag-each-removebg-preview.png",
  //     slug: "yellow-sweet-corn",
  //   },
  //   {
  //     id: 4,
  //     name: "Organic Baby Carrot",
  //     category: "Vegetables",
  //     price: 150.0,
  //     originalPrice: 168.23,
  //     rating: 4.3,
  //     reviews: 4,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738770398/product/Organic-Baby-Carrot-1oz-removebg-preview.png",
  //     slug: "organic-baby-carrot",
  //   },
  //   {
  //     id: 5,
  //     name: "Organic Cherry Tomato",
  //     category: "Vegetables",
  //     price: 15.56,
  //     originalPrice: 15.56,
  //     rating: 2.2,
  //     reviews: 5,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738770456/product/Orange-Cherry-Tomato-5qt-removebg-preview.png",
  //     slug: "organic-cherry-tomato",
  //   },
  //   {
  //     id: 6,
  //     name: "Atlantic Salmon",
  //     category: "Fish & Meat",
  //     price: 10.36,
  //     originalPrice: 10.36,
  //     rating: 2.5,
  //     reviews: 6,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png",
  //     slug: "atlantic-salmon",
  //   },
  //   {
  //     id: 7,
  //     name: "Dates Loose",
  //     category: "Fruits",
  //     price: 102.33,
  //     originalPrice: 102.33,
  //     rating: 3.5,
  //     reviews: 6,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738773409/product/Dates-Khejur-Lulu-Loose-Kg-removebg-preview.png",
  //     slug: "dates-loose",
  //   },
  //   {
  //     id: 8,
  //     name: "Rainbow Chard",
  //     category: "Vegetables",
  //     price: 7.07,
  //     originalPrice: 7.07,
  //     rating: 3.3,
  //     reviews: 6,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738768919/product/Rainbow-Chard-Package-per-lb-removebg-preview.png",
  //     slug: "rainbow-chard",
  //   },
  //   {
  //     id: 9,
  //     name: "Green Cauliflower",
  //     category: "Vegetables",
  //     price: 94.12,
  //     originalPrice: 94.12,
  //     rating: 3.7,
  //     reviews: 6,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738770041/product/Green-Cauliflower-12ct-removebg-preview.png",
  //     slug: "green-cauliflower",
  //   },
  //   {
  //     id: 10,
  //     name: "Fresh Dates",
  //     category: "Fruits",
  //     price: 226.98,
  //     originalPrice: 226.98,
  //     rating: 0.0,
  //     reviews: 0,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738773208/product/Fresh-Dates-Package-10oz-removebg-preview.png",
  //     slug: "fresh-dates",
  //   },
  //   {
  //     id: 11,
  //     name: "Organic Green Cauliflower",
  //     category: "Vegetables",
  //     price: 142.4,
  //     originalPrice: 142.4,
  //     rating: 1.6,
  //     reviews: 5,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738770181/product/Organic-Green-Cauliflower-1lb-removebg-preview.png",
  //     slug: "organic",
  //   },
  //   {
  //     id: 12,
  //     name: "Green Leaf Lettuce",
  //     category: "Vegetables",
  //     price: 112.72,
  //     originalPrice: 112.72,
  //     rating: 3.1,
  //     reviews: 8,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738768876/product/Green-Leaf-Lettuce-each__1_-removebg-preview%25281%2529.png",
  //     slug: "green-leaf-lettuce",
  //   },
  //   {
  //     id: 13,
  //     name: "Radicchio",
  //     category: "Vegetables",
  //     price: 45.0,
  //     originalPrice: 58.66,
  //     rating: 2.5,
  //     reviews: 2,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738769310/product/Radicchio-12ct-removebg-preview.png",
  //     slug: "radicchio",
  //   },
  //   {
  //     id: 14,
  //     name: "Escarole",
  //     category: "Vegetables",
  //     price: 0.0,
  //     originalPrice: 0.0,
  //     rating: 1.8,
  //     reviews: 6,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738773078/product/Escarole-1ct-removebg-preview.png",
  //     slug: "escarole",
  //   },
  //   {
  //     id: 15,
  //     name: "Himalaya Powder",
  //     category: "Baby Care",
  //     price: 160.0,
  //     originalPrice: 174.97,
  //     rating: 3.6,
  //     reviews: 5,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738768685/product/Himalaya-Baby-Powder-100g-removebg-preview.png",
  //     slug: "himalaya-powder",
  //   },
  //   {
  //     id: 16,
  //     name: "Rainbow Peppers",
  //     category: "Vegetables",
  //     price: 90.85,
  //     originalPrice: 90.85,
  //     rating: 0.0,
  //     reviews: 0,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738769097/product/Rainbow-Peppers-4ct-removebg-preview.png",
  //     slug: "rainbow-peppers",
  //   },
  //   {
  //     id: 17,
  //     name: "Parsley",
  //     category: "Vegetables",
  //     price: 134.63,
  //     originalPrice: 134.63,
  //     rating: 1.0,
  //     reviews: 1,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738769346/product/Parsley-each-removebg-preview%25281%2529.png",
  //     slug: "parsley",
  //   },
  //   {
  //     id: 18,
  //     name: "Cauliflower",
  //     category: "Vegetables",
  //     price: 139.15,
  //     originalPrice: 139.15,
  //     rating: 2.4,
  //     reviews: 7,
  //     image:
  //       "https://res.cloudinary.com/ahossain/image/upload/v1738769405/product/Cauliflower-1-35lb-removebg-preview.png",
  //     slug: "cauliflower",
  //   },
  // ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((products) => product.category === selectedCategory);

  const handleQuickView = (product) => {
    console.log("Quick view:", product);
    // Add your quick view modal logic here
  };

  const handleAddToCart = (product, quantity) => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // Add your cart logic here
  };

  return (
    <div className="w-full bg-gray-50 py-8 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            Featured Product
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative pb-2 text-sm sm:text-base font-medium transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? "text-(--color-primary) border-b-2 border-(--color-primary)"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid using ProductCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
