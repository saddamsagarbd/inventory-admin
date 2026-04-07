// pages/customers/Customers.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerTable from "./components/CustomerTable";
import ExportCustomers from "./components/ExportCustomers";
import { useCustomers } from "../../../hooks/useCustomers";

const Customers = () => {
  const { customers, loading, error, fetchCustomers } = useCustomers();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    dateRange: { start: "", end: "" },
    minOrders: "",
    maxOrders: "",
    status: "all",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredCustomers = customers.filter((customer) => {
    // Search filter
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.phone && customer.phone.includes(searchTerm));

    // Date range filter
    let matchesDate = true;
    if (filters.dateRange.start && customer.joinedDate) {
      const joinedDate = new Date(customer.joinedDate);
      const startDate = new Date(filters.dateRange.start);
      matchesDate = joinedDate >= startDate;
    }
    if (filters.dateRange.end && matchesDate && customer.joinedDate) {
      const joinedDate = new Date(customer.joinedDate);
      const endDate = new Date(filters.dateRange.end);
      matchesDate = joinedDate <= endDate;
    }

    // Order count filter
    const matchesOrders =
      (!filters.minOrders ||
        customer.totalOrders >= parseInt(filters.minOrders)) &&
      (!filters.maxOrders ||
        customer.totalOrders <= parseInt(filters.maxOrders));

    // Status filter
    const matchesStatus =
      filters.status === "all" || customer.status === filters.status;

    return matchesSearch && matchesDate && matchesOrders && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Customer Management
        </h1>
        <p className="text-gray-600 mt-1">
          Manage and view all customer information
        </p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border text-black border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </button>
        </div>
        <div className="flex gap-3">
          <ExportCustomers customers={filteredCustomers} />
          <Link
            to="/admin/customers/add"
            className="px-4 py-2 bg-(--color-primary) text-white rounded-lg hover:bg-(--color-primary-hover) flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Customer
          </Link>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Since (From)
              </label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) =>
                  handleFilterChange("dateRange", {
                    ...filters.dateRange,
                    start: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Since (To)
              </label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) =>
                  handleFilterChange("dateRange", {
                    ...filters.dateRange,
                    end: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Count Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minOrders}
                  onChange={(e) =>
                    handleFilterChange("minOrders", e.target.value)
                  }
                  className="w-1/2 px-3 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxOrders}
                  onChange={(e) =>
                    handleFilterChange("maxOrders", e.target.value)
                  }
                  className="w-1/2 px-3 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-3 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() =>
                setFilters({
                  dateRange: { start: "", end: "" },
                  minOrders: "",
                  maxOrders: "",
                  status: "all",
                })
              }
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Customer Table */}
      <CustomerTable customers={filteredCustomers} />
    </div>
  );
};

export default Customers;
