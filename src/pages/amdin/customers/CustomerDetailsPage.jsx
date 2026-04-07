// pages/customers/CustomerDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import OrderHistoryTable from "./components/OrderHistoryTable";
import ActivityLog from "./components/ActivityLog";

import { useCustomers } from "./../../../hooks/useCustomers";
import Modal from "./../../../common/Modal";

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCustomer, updateCustomerStatus, sendEmailToCustomer, loading } =
    useCustomers();
  const [customer, setCustomer] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
  });
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);

  useEffect(() => {
    loadCustomer();
  }, [id]);

  const loadCustomer = async () => {
    const data = await getCustomer(id);
    setCustomer(data);
  };

  const handleBlockCustomer = async () => {
    const newStatus = customer.status === "blocked" ? "active" : "blocked";
    await updateCustomerStatus(id, newStatus);
    await loadCustomer();
    setShowBlockConfirm(false);
  };

  const handleSendEmail = async () => {
    await sendEmailToCustomer(id, emailData);
    setShowEmailModal(false);
    setEmailData({ subject: "", message: "" });
  };

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--color-primary)"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/customers")}
          className="mb-4 text-(--color-primary) hover:text-(--color-primary-hover) flex items-center gap-2"
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

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {customer.name}
            </h1>
            <p className="text-gray-600 mt-1">
              Customer since{" "}
              {new Date(customer.joinedDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowEmailModal(true)}
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Send Email
            </button>
            <button
              onClick={() => setShowBlockConfirm(true)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                customer.status === "blocked"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
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
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
              {customer.status === "blocked"
                ? "Unblock Customer"
                : "Block Customer"}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <p className="mt-1 text-gray-900">{customer.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email Address
                </label>
                <p className="mt-1 text-gray-900">{customer.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Phone Number
                </label>
                <p className="mt-1 text-gray-900">
                  {customer.phone || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Account Status
                </label>
                <span
                  className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    customer.status === "active"
                      ? "bg-green-100 text-green-800"
                      : customer.status === "blocked"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {customer.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Address Management */}
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Addresses
            </h2>
            <div className="space-y-4">
              {customer.addresses && customer.addresses.length > 0 ? (
                customer.addresses.map((address, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        {address.isDefault && (
                          <span className="inline-block px-2 py-1 text-xs bg-(--color-primary) text-white rounded mb-2">
                            Default
                          </span>
                        )}
                        <p className="text-gray-900">{address.street}</p>
                        <p className="text-gray-600">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-gray-600">{address.country}</p>
                        {address.phone && (
                          <p className="text-gray-600 mt-1">
                            Phone: {address.phone}
                          </p>
                        )}
                      </div>
                      <button className="text-(--color-primary) hover:text-(--color-primary-hover) text-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No addresses added</p>
              )}
              <button className="mt-2 text-(--color-primary) hover:text-(--color-primary-hover) text-sm flex items-center gap-1">
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
          </div>
        </div>

        {/* Customer Stats */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Customer Statistics
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Total Orders
                </label>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {customer.totalOrders || 0}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Total Spent
                </label>
                <p className="mt-1 text-2xl font-bold text-green-600">
                  ${(customer.totalSpent || 0).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Average Order Value
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  $
                  {customer.totalOrders
                    ? (customer.totalSpent / customer.totalOrders).toFixed(2)
                    : "0.00"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Last Order Date
                </label>
                <p className="mt-1 text-gray-900">
                  {customer.lastOrderDate
                    ? new Date(customer.lastOrderDate).toLocaleDateString()
                    : "No orders yet"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Order History
        </h2>
        <OrderHistoryTable orders={customer.orders || []} />
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Activity Log
        </h2>
        <ActivityLog activities={customer.activities || []} />
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <Modal onClose={() => setShowEmailModal(false)}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Send Email to {customer.name}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) =>
                    setEmailData({ ...emailData, subject: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={emailData.message}
                  onChange={(e) =>
                    setEmailData({ ...emailData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your message here..."
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEmail}
                  className="px-4 py-2 bg-(--color-primary) text-white rounded-lg hover:bg-(--color-primary-hover)"
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Block Confirmation Modal */}
      {showBlockConfirm && (
        <Modal onClose={() => setShowBlockConfirm(false)}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {customer.status === "blocked"
                ? "Unblock Customer"
                : "Block Customer"}
            </h2>
            <p className="text-gray-600 mb-6">
              {customer.status === "blocked"
                ? `Are you sure you want to unblock ${customer.name}? They will be able to access their account again.`
                : `Are you sure you want to block ${customer.name}? They will not be able to place orders or access their account.`}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowBlockConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBlockCustomer}
                className={`px-4 py-2 text-white rounded-lg ${
                  customer.status === "blocked"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {customer.status === "blocked" ? "Yes, Unblock" : "Yes, Block"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CustomerDetailsPage;
