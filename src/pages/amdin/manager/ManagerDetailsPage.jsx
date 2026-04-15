import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import OrderHistoryTable from "./components/OrderHistoryTable";
import ActivityLog from "./components/ActivityLog";

import { useManager } from "../../../hooks/useManagers";
import Modal from "../../../common/Modal";

const ManagerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getManager, updateManagerStatus, sendEmailToManager, loading } =
    useManager();
  const [manager, setManager] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
  });
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);

  const loadManager = async () => {
    const manager = await getManager(id);
    setManager(manager);
  };

  useEffect(() => {
    
    loadManager();
    
  }, [id]);

  const handleBlockManager = async () => {
    const newStatus = manager.status === "blocked" ? "active" : "blocked";
    await updateManagerStatus(id, newStatus);
    await loadManager();
    setShowBlockConfirm(false);
  };

  const handleSendEmail = async () => {
    await sendEmailToManager(id, emailData);
    setShowEmailModal(false);
    setEmailData({ subject: "", message: "" });
  };

  if (!manager) {
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
          onClick={() => navigate("/admin/Managers")}
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
          Back to Managers
        </button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {manager.user.name}
            </h1>
            <p className="text-gray-600 mt-1">
              Manager since{" "}
              {new Date(manager.user.joinedDate).toLocaleDateString()}
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
                manager.user.is_active === "blocked" || manager.user.is_active === false
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
              {manager.user.is_active === "blocked" || manager.user.is_active === false
                ? "Unblock Manager"
                : "Block Manager"}
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
                <p className="mt-1 text-gray-900">{manager.user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email Address
                </label>
                <p className="mt-1 text-gray-900">{manager.user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Phone Number
                </label>
                <p className="mt-1 text-gray-900">
                  {manager.user.phone || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Account Status
                </label>
                <span
                  className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    manager.user.is_active === "active" || manager.user.is_active === true
                      ? "bg-green-100 text-green-800"
                      : manager.user.is_active === "blocked" || manager.user.is_active === false
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {manager.user.is_active?"ACTIVE":"IN-ACTIVE"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mt-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Store Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Store Code
                </label>
                <p className="mt-1 text-gray-900 font-bold">{manager.store.code}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Title
                </label>
                <p className="mt-1 text-gray-900">{manager.store.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Address
                </label>
                <p className="mt-1 text-gray-900">{manager.store.address}, {manager.store.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Email Modal */}
      {showEmailModal && (
        <Modal onClose={() => setShowEmailModal(false)}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Send Email to {manager.user.name}
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
              {manager.user.is_active === "blocked" || manager.user.is_active === false
                ? "Unblock Manager"
                : "Block Manager"}
            </h2>
            <p className="text-gray-600 mb-6">
              {manager.user.is_active === "blocked" || manager.user.is_active === false
                ? `Are you sure you want to unblock ${manager.user.name}? They will be able to access their account again.`
                : `Are you sure you want to block ${manager.user.name}? They will not be able to place orders or access their account.`}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowBlockConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBlockManager}
                className={`px-4 py-2 text-white rounded-lg ${
                  manager.user.is_active === "blocked" || manager.user.is_active === false
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                { (manager.user.is_active === "blocked" || manager.user.is_active === false) ? "Yes, Unblock" : "Yes, Block"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManagerDetailsPage;
