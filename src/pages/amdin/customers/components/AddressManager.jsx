// components/customers/AddressManager.jsx
import React, { useState } from "react";

const AddressManager = ({ addresses, onChange }) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    isDefault: false,
  });

  const handleAddAddress = () => {
    const newAddress = { ...addressForm, id: Date.now() };
    const updatedAddresses = [...addresses, newAddress];
    if (addressForm.isDefault) {
      updatedAddresses.forEach((addr) => {
        if (addr.id !== newAddress.id) addr.isDefault = false;
      });
    }
    onChange(updatedAddresses);
    setShowAddressForm(false);
    resetForm();
  };

  const handleEditAddress = () => {
    const updatedAddresses = addresses.map((addr) =>
      addr.id === editingAddress.id ? { ...addressForm, id: addr.id } : addr,
    );
    if (addressForm.isDefault) {
      updatedAddresses.forEach((addr) => {
        if (addr.id !== editingAddress.id) addr.isDefault = false;
      });
    }
    onChange(updatedAddresses);
    setEditingAddress(null);
    resetForm();
  };

  const handleDeleteAddress = (addressId) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== addressId);
    onChange(updatedAddresses);
  };

  const handleSetDefault = (addressId) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === addressId,
    }));
    onChange(updatedAddresses);
  };

  const resetForm = () => {
    setAddressForm({
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      isDefault: false,
    });
  };

  const startEdit = (address) => {
    setEditingAddress(address);
    setAddressForm(address);
    setShowAddressForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Addresses</h2>
        <button
          type="button"
          onClick={() => {
            resetForm();
            setEditingAddress(null);
            setShowAddressForm(true);
          }}
          className="text-(--color-primary) hover:text-(--color-primary-hover) cursor-pointer text-sm flex items-center gap-1"
        >
          <svg
            className="w-4 h-4"
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
          Add New Address
        </button>
      </div>

      {/* Address List */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {address.isDefault && (
                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-(--color-primary) rounded mb-2">
                    Default
                  </span>
                )}
                <p className="text-gray-900">{address.street}</p>
                <p className="text-gray-600">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-gray-600">{address.country}</p>
                {address.phone && (
                  <p className="text-gray-600 mt-1">Phone: {address.phone}</p>
                )}
              </div>
              <div className="flex gap-2">
                {!address.isDefault && (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(address.id)}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    Set Default
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => startEdit(address)}
                  className="text-sm text-(--color-primary) hover:text-(--color-hover-primary)"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {addresses.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No addresses added yet
          </p>
        )}
      </div>

      {/* Address Form Modal */}
      {showAddressForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={addressForm.street}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, street: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={addressForm.city}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, city: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={addressForm.state}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          state: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={addressForm.zipCode}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          zipCode: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={addressForm.country}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          country: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={addressForm.phone}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={addressForm.isDefault}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        isDefault: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isDefault"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Set as default address
                  </label>
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddressForm(false);
                    setEditingAddress(null);
                    resetForm();
                  }}
                  className="px-4 py-2 border bg-red-500 text-black border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={
                    editingAddress ? handleEditAddress : handleAddAddress
                  }
                  className="px-4 py-2 bg-(--color-primary) text-white rounded-lg hover:bg-(--color-hover-primary)"
                >
                  {editingAddress ? "Update Address" : "Add Address"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressManager;
