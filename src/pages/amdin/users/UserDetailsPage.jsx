import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import OrderHistoryTable from "./components/OrderHistoryTable";
import ActivityLog from "./components/ActivityLog";

import { useUsers } from "./../../../hooks/useUsers";
import Modal from "./../../../common/Modal";

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUser, updateUserStatus, sendEmailToUser, loading } =
    useUsers();
  const [User, setUser] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
  });
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    const data = await getUser(id);
    setUser(data);
  };

  const handleBlockUser = async () => {
    const newStatus = User.status === "blocked" ? "active" : "blocked";
    await updateUserStatus(id, newStatus);
    await loadUser();
    setShowBlockConfirm(false);
  };

  const handleSendEmail = async () => {
    await sendEmailToUser(id, emailData);
    setShowEmailModal(false);
    setEmailData({ subject: "", message: "" });
  };

  if (!User) {
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
          onClick={() => navigate("/admin/users")}
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
          Back to Users
        </button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {User.name}
            </h1>
            <p className="text-gray-600 mt-1">
              User since{" "}
              {new Date(User.joinedDate).toLocaleDateString()}
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
                User.status === "blocked"
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
              {User.status === "blocked"
                ? "Unblock User"
                : "Block User"}
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
                <p className="mt-1 text-gray-900">{User.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email Address
                </label>
                <p className="mt-1 text-gray-900">{User.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Phone Number
                </label>
                <p className="mt-1 text-gray-900">
                  {User.phone || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Account Status
                </label>
                <span
                  className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    User.is_active === "active" || User.is_active === true
                      ? "bg-green-100 text-green-800"
                      : User.is_active === "blocked" || User.is_active === false
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {User.is_active?"ACTIVE":"IN-ACTIVE"}
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
              {User.addresses && User.addresses.length > 0 ? (
                User.addresses.map((address, index) => (
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

        {/* User Stats */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              User Statistics
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Total Orders
                </label>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {User.totalOrders || 0}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Total Spent
                </label>
                <p className="mt-1 text-2xl font-bold text-green-600">
                  ${(User.totalSpent || 0).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Average Order Value
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  $
                  {User.totalOrders
                    ? (User.totalSpent / User.totalOrders).toFixed(2)
                    : "0.00"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Last Order Date
                </label>
                <p className="mt-1 text-gray-900">
                  {User.lastOrderDate
                    ? new Date(User.lastOrderDate).toLocaleDateString()
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
        <OrderHistoryTable orders={User.orders || []} />
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Activity Log
        </h2>
        <ActivityLog activities={User.activities || []} />
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <Modal onClose={() => setShowEmailModal(false)}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Send Email to {User.name}
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
              {User.status === "blocked"
                ? "Unblock User"
                : "Block User"}
            </h2>
            <p className="text-gray-600 mb-6">
              {User.status === "blocked"
                ? `Are you sure you want to unblock ${User.name}? They will be able to access their account again.`
                : `Are you sure you want to block ${User.name}? They will not be able to place orders or access their account.`}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowBlockConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBlockUser}
                className={`px-4 py-2 text-white rounded-lg ${
                  User.status === "blocked"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {User.status === "blocked" ? "Yes, Unblock" : "Yes, Block"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserDetailsPage;
