// components/orders/OrderFilters.jsx
import React, { useState } from "react";

const OrderFilters = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "confirmed", label: "Confirmed" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "refunded", label: "Refunded" },
  ];

  const paymentStatusOptions = [
    { value: "", label: "All Payment Status" },
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
    { value: "failed", label: "Failed" },
    { value: "refunded", label: "Refunded" },
  ];

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      status: "",
      paymentStatus: "",
      dateRange: { start: "", end: "" },
      search: "",
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Status
          </label>
          <select
            value={localFilters.status}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, status: e.target.value })
            }
            className="w-full px-3 py-2 border text-black cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Status
          </label>
          <select
            value={localFilters.paymentStatus}
            onChange={(e) =>
              setLocalFilters({
                ...localFilters,
                paymentStatus: e.target.value,
              })
            }
            className="w-full px-3 py-2 border text-black cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {paymentStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date From
          </label>
          <input
            type="date"
            value={localFilters.dateRange.start}
            onChange={(e) =>
              setLocalFilters({
                ...localFilters,
                dateRange: { ...localFilters.dateRange, start: e.target.value },
              })
            }
            className="w-full px-3 py-2 border text-black cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date To
          </label>
          <input
            type="date"
            value={localFilters.dateRange.end}
            onChange={(e) =>
              setLocalFilters({
                ...localFilters,
                dateRange: { ...localFilters.dateRange, end: e.target.value },
              })
            }
            className="w-full px-3 py-2 border text-black cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by Order ID, Customer Name, or Email"
            value={localFilters.search}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, search: e.target.value })
            }
            className="w-full px-3 py-2 border text-black cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm cursor-pointer font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-(--color-primary) focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reset
        </button>
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-(--color-primary) border border-transparent rounded-md hover:bg-(--color-primary-hover) focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default OrderFilters;
