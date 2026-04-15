import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AddressManager from "./components/AddressManager";
import { useManager } from "../../../hooks/useManagers";

const ManagerFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, stores, fetchUsers, fetchStores, getManager, createManager, updateManager, loading } = useManager();

  const [formData, setFormData] = useState({
    user: "",
    store: "",
    role: "",
    isActive: true,
    addresses: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers();
    fetchStores();
  }, []);

  const loadManager = async () => {
    const data = await getManager(id);
    setFormData({
      user: data.userId || "",
      store:  data.storeId || "",
      role:  data.role || "",
      isActive: true,
      addresses: [],
    });
  };

  useEffect(() => {
    if (id) {
      loadManager();
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.user.trim()) newErrors.user = "User is required";
    if (!formData.store.trim()) newErrors.store = "Store is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (id) {
        await updateManager(id, formData);
      } else {
        await createManager(formData);
      }
      navigate("/admin/managers");
    } catch (error) {
      console.error("Failed to save Manager:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/managers")}
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
          Back to Managers
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {id ? "Edit Manager" : "Add New Manager"}
        </h1>
        <p className="text-gray-600 mt-1">
          {id ? "Update Manager information" : "Create a new Manager account"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User *
              </label>
              <select
                value={formData.user}
                onChange={(e) =>
                  setFormData({ ...formData, user: e.target.value })
                }
                className="w-full px-3 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select user</option>
                {users && users.length > 0 ? (
                  users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No user available</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store *
              </label>
              <select
                value={formData.store}
                onChange={(e) =>
                  setFormData({ ...formData, store: e.target.value })
                }
                className="w-full px-3 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select store</option>
                {stores && stores.length > 0 ? (
                  stores.map((store) => (
                      <option key={store._id} value={store._id}>
                        {store.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No stores available</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-3 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select role</option>
                <option value="manager">Manager</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Management */}
        {/* <div className="bg-white rounded-lg shadow p-6">
          <AddressManager
            addresses={formData.addresses}
            onChange={handleAddressChange}
          />
        </div> */}

        {/* Form Actions */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin/managers")}
            className="px-6 py-2 border bg-red-500 cursor-pointer text-white border-gray-300 rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-(--color-primary) text-white cursor-pointer rounded-lg hover:bg-(--color-primary-hover) disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Set Manager"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManagerFormPage;
