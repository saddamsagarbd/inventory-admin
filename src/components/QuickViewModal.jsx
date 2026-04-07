import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { X, Plus, Minus, Eye, ShoppingCart, Star } from "lucide-react";

const QuickViewModal = ({ product, isOpen, onClose, onViewDetails }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart({ ...product, qty: quantity });
    onClose();
  };

  const handleViewDetails = () => {
    onViewDetails(product);
    onClose();
  };

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const renderStars = (rating) => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i < fullStars ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        />,
      );
    }
    return stars;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-6 p-8">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gray-50 rounded-lg p-6">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full h-auto object-contain max-h-80"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col space-y-4">
              {/* Stock Status */}
              <div className="text-sm text-gray-600">
                In stock:{" "}
                <span className="font-semibold text-green-600">
                  {product.stock || 486}
                </span>
              </div>

              {/* Product Name */}
              <h2 className="text-2xl font-bold text-gray-800">
                {product.name}
              </h2>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating.toFixed(1)} ({product.reviews || 0} reviews)
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description ||
                  "Cooking oil is plant, animal, or synthetic fat used in frying, baking, and other types of cooking. Cooking oil is typically a liquid at room temperature, although some oils that contain saturated fat, such as coconut oil, palm oil and palm kernel oil are solid."}
              </p>

              {/* Price */}
              <div className="text-3xl font-bold text-gray-900">
                ${product.price?.toFixed(2)}
              </div>

              {/* Quantity Selector and Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity Selector */}
                <div className="flex items-center border-2 border-gray-300 rounded-lg w-full sm:w-auto">
                  <button
                    onClick={decreaseQty}
                    className="w-10 h-10 flex items-center cursor-pointer justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" color="black" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-16 h-10 text-center text-black border-x-2 border-gray-300 focus:outline-none"
                  />
                  <button
                    onClick={increaseQty}
                    className="w-10 h-10 flex items-center cursor-pointer justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" color="black" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-(--color-primary) cursor-pointer hover:bg-(--color-primary-hover) text-white font-semibold py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden sm:inline">Add to cart</span>
                </button>

                {/* View Details Button */}
                <button
                  onClick={handleViewDetails}
                  className="bg-(--color-primary) cursor-pointer hover:bg-(--color-primary-hover) text-white border-2 border-gray-300 font-semibold py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  <span className="hidden sm:inline">View details</span>
                </button>
              </div>

              {/* Category */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600 font-semibold">Category:</span>
                  <span className="text-gray-800">
                    {product.category || "oil"}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {product.tags?.[0] || "fortune oil"}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {product.tags?.[1] || "oil"}
                  </span>
                </div>
              </div>

              {/* Call for Order */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>📞 Call Us for Order</span>
                <a
                  href="tel:+099949343"
                  className="text-green-600 font-semibold hover:underline"
                >
                  +099949343
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuickViewModal;
