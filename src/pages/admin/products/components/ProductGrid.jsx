import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, onDelete, getStockStatus }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const stockStatus = getStockStatus(
          product.stock,
          product.lowStockThreshold,
        );
        return (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.salePrice && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  SALE
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
              <div className="flex items-center justify-between mb-3">
                <div>
                  {product.salePrice ? (
                    <>
                      <span className="text-lg font-bold text-red-600">
                        ${product.salePrice}
                      </span>
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${stockStatus.color}`}
                >
                  {stockStatus.label}
                </span>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/admin/products/${product.id}`}
                  className="flex-1 bg-(--color-primary) text-white px-3 py-1 rounded text-center hover:bg-(--color-primary-hover) transition"
                >
                  <Eye size={16} className="inline mr-1" /> View
                </Link>
                <Link
                  to={`/admin/products/edit/${product.id}`}
                  className="flex-1 bg-(--color-primary) text-white px-3 py-1 rounded text-center hover:bg-(--color-primary-hover) transition"
                >
                  <Edit size={16} className="inline mr-1" /> Edit
                </Link>
                <button
                  onClick={() => onDelete(product)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
