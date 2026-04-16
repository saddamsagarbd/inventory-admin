// pages/customers/CustomerFormPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AddressManager from "./components/AddressManager";
import { useCustomers } from "../../../hooks/useCustomers";

const CustomerFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCustomer, createCustomer, updateCustomer, loading } =
    useCustomers();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
    addresses: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      loadCustomer();
    }
  }, [id]);

  const loadCustomer = async () => {
    const data = await getCustomer(id);
    setFormData({
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      status: data.status || "active",
      addresses: data.addresses || [],
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (formData.phone && !/^[\d\s+-]+$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (id) {
        await updateCustomer(id, formData);
      } else {
        await createCustomer(formData);
      }
      navigate("/admin/customers");
    } catch (error) {
      console.error("Failed to save customer:", error);
    }
  };

  const handleAddressChange = (addresses) => {
    setFormData({ ...formData, addresses });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/customers")}
          className="mb-4 text-(--color-primary) hover:text-(--color-hover-primary) flex items-center gap-2"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Customers
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {id ? "Edit Customer" : "Add New Customer"}
        </h1>
        <p className="text-gray-600 mt-1">
          {id ? "Update customer information" : "Create a new customer account"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full px-3 text-black py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={`w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+1 (555) 000-0000"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-3 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Management */}
        <div className="bg-white rounded-lg shadow p-6">
          <AddressManager
            addresses={formData.addresses}
            onChange={handleAddressChange}
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin/customers")}
            className="px-6 py-2 border bg-red-500 cursor-pointer text-white border-gray-300 rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-(--color-primary) text-white cursor-pointer rounded-lg hover:bg-(--color-primary-hover) disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : id ? "Update Customer" : "Create Customer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerFormPage;
