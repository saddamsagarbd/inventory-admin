// components/inventory/StockAdjustmentModal.jsx
import React, { useState } from "react";

const StockAdjustmentModal = ({ product, onClose, onAdjust }) => {
  const [adjustment, setAdjustment] = useState({
    quantity: 0,
    reason: "purchase",
    note: "",
  });

  const reasons = [
    { value: "purchase", label: "Purchase Order" },
    { value: "return", label: "Customer Return" },
    { value: "damage", label: "Damaged Goods" },
    { value: "theft", label: "Theft/Loss" },
    { value: "inventory", label: "Inventory Correction" },
    { value: "transfer", label: "Stock Transfer" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (adjustment.quantity !== 0) {
      onAdjust(product.id, adjustment.quantity, adjustment);
    }
  };

  const handleQuantityChange = (value) => {
    const numValue = parseInt(value);
    setAdjustment({ ...adjustment, quantity: isNaN(numValue) ? 0 : numValue });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Adjust Stock - {product.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Stock
            </label>
            <p className="text-lg font-semibold text-gray-900">
              {product.currentStock}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity Adjustment
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuantityChange(adjustment.quantity - 1)}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                value={adjustment.quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter quantity"
              />
              <button
                type="button"
                onClick={() => handleQuantityChange(adjustment.quantity + 1)}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Use positive numbers to add stock, negative to remove
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>
            <select
              value={adjustment.reason}
              onChange={(e) =>
                setAdjustment({ ...adjustment, reason: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {reasons.map((reason) => (
                <option key={reason.value} value={reason.value}>
                  {reason.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note (Optional)
            </label>
            <textarea
              value={adjustment.note}
              onChange={(e) =>
                setAdjustment({ ...adjustment, note: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Adjustment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockAdjustmentModal;
