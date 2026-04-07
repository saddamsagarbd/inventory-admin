import React, { useContext, useState } from "react";
import { Maximize2, Plus, Minus, Star, ShoppingBag } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import QuickViewModal from "./QuickViewModal";

const ProductCard = ({ product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate(); // React Router
  const { cart, addToCart, increaseQty, decreaseQty } = useContext(CartContext);

  const inCart = cart.find((item) => item.id === product.id);
  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };
  const handleViewDetails = (product) => {
    console.log("Navigate to product details:", product.id);
    navigate(`/product-details/${product.slug || product.id}`);
  };
  const quantity = inCart?.qty || 1;
  const renderStars = (rating) => {
    if (!rating) return null;

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-3 h-3 text-gray-300" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: "50%" }}
            >
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
            </div>
          </div>,
        );
      } else {
        stars.push(<Star key={i} className="w-3 h-3 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-white border-gray-100 transition-all duration-100 ease-in-out hover:border-(--color-primary)">
      {/* Image Section */}
      <div className="relative w-full min-h-48 lg:h-48 xl:h-52">
        <Link
          className="relative block w-full h-full overflow-hidden bg-gray-100"
          href={`/product-details/${product.slug || product.id}`}
        >
          <img
            alt={product.name}
            src={product.image}
            className="object-contain transition duration-150 ease-linear transform group-hover:scale-105 p-2 w-full h-full"
          />
        </Link>

        {/* Quick View Button */}
        <div className="absolute lg:bottom-0 bottom-4 lg:group-hover:bottom-4 inset-x-1 opacity-100 flex justify-center lg:opacity-0 lg:invisible group-hover:opacity-100 group-hover:visible transition-all">
          <button
            onClick={() => handleQuickView(product)}
            aria-label="quick view"
            className="relative h-auto inline-flex items-center cursor-pointer justify-center rounded-full transition-colors text-xs py-2 px-4 bg-white text-slate-700 hover:text-(--color-primary) hover:bg-gray-100 shadow-lg focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-(--color-primary)"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="ms-1 hidden xl:block lg:block">Quick View</span>
          </button>
        </div>

        {/* ======== CART BUTTON OR QUANTITY CONTROLS ======== */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-(--color-primary)">
          {!inCart ? (
            /* ===== CART ICON WHEN NOT IN CART ===== */
            <button
              aria-label="cart"
              onClick={() => addToCart(product)}
              className="w-11 h-11 flex items-center justify-center rounded-full cursor-pointer border-2 bg-(--color-primary-hover) text-white border-gray-10 font-medium transition-colors duration-300 hover:border-accent hover:bg-(--color-primary-hover) hover:border-(--color-primary) hover:text-gray-50 focus:border-(--color-primary) focus:bg-(--color-primary) focus:text-gray-50"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          ) : (
            /* ===== + / - CONTROLS WHEN IN CART ===== */
            <div className="flex flex-col w-11 h-22 items-center p-1 justify-between bg-(--color-primary) text-white ring-2 ring-white rounded-full">
              <button
                onClick={() => increaseQty(product.id)}
                className="p-1 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
              <p className="text-sm px-1 font-medium">{quantity}</p>

              <button
                onClick={() => decreaseQty(product.id)}
                className="p-1 cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <QuickViewModal
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
          onViewDetails={handleViewDetails}
        />
      </div>

      {/* Product Info Section */}
      <div className="flex flex-1 flex-col space-y-2 px-4 pt-2 pb-4">
        <div className="relative mb-1">
          <a
            className="text-sm font-medium text-gray-800 line-clamp-1 hover:text-(--color-primary)"
            href={`/product/${product.slug || product.id}`}
          >
            {product.name}
          </a>
        </div>

        {product.rating && product.reviews && (
          <div className="flex gap-0.5 items-center">
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <div className="text-xs ml-1 text-gray-400">
                <span className="font-medium">{product.rating}</span>
                <span> ( {product.reviews} reviews )</span>
              </div>
            </div>
          </div>
        )}

        <div className="product-price font-bold">
          <span className="inline-block text-base text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through ml-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
