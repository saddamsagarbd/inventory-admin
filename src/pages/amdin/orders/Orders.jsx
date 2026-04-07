// pages/Orders.jsx
import React, { useState } from "react";
import OrderList from "./components/OrderList";
import OrderFilters from "./components/OrderFilters";

const Orders = () => {
  const [filters, setFilters] = useState({
    status: "",
    paymentStatus: "",
    dateRange: { start: "", end: "" },
    search: "",
  });

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleBulkStatusUpdate = async (orderIds, newStatus) => {
    // API call to update bulk status
    console.log("Updating orders:", orderIds, "to status:", newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and track all customer orders
          </p>
        </div>

        <OrderFilters filters={filters} onFilterChange={handleFilterChange} />
        <OrderList
          filters={filters}
          onBulkStatusUpdate={handleBulkStatusUpdate}
        />
      </div>
    </div>
  );
};

export default Orders;
