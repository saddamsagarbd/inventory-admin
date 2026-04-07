// components/orders/OrderStatusModal.jsx
import React, { useState } from "react";

const OrderStatusModal = ({ currentStatus, onClose, onUpdate }) => {
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState("");
  const [sendEmail, setSendEmail] = useState(true);
  const [loading, setLoading] = useState(false);

  const statusFlow = {
    pending: ["processing", "cancelled"],
    processing: ["confirmed", "cancelled"],
    confirmed: ["shipped", "cancelled"],
    shipped: ["delivered", "cancelled"],
    delivered: ["refunded"],
    cancelled: [],
    refunded: [],
  };

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "confirmed", label: "Confirmed" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "refunded", label: "Refunded" },
  ];

  const getAvailableStatuses = () => {
    if (!statusFlow[currentStatus]) return [];
    return statusFlow[currentStatus];
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onUpdate(status, note, sendEmail);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Update Order Status
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Status:{" "}
                <span className="font-semibold">{currentStatus}</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={!getAvailableStatuses().includes(option.value)}
                  >
                    {option.label}
                    {!getAvailableStatuses().includes(option.value) &&
                      option.value !== currentStatus &&
                      " (Not allowed)"}
                  </option>
                ))}
              </select>
              {status !== currentStatus &&
                !getAvailableStatuses().includes(status) && (
                  <p className="mt-1 text-sm text-red-600">
                    Status flow validation: Cannot change from {currentStatus}{" "}
                    to {status}
                  </p>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Note (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows="3"
                className="w-full px-3 py-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a note for the customer..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="sendEmail"
                checked={sendEmail}
                onChange={(e) => setSendEmail(e.target.checked)}
                className="h-4 w-4 text-black focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="sendEmail"
                className="ml-2 block text-sm text-gray-900"
              >
                Send email notification to customer
              </label>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-3 rounded-b-lg flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-red border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              loading ||
              (status !== currentStatus &&
                !getAvailableStatuses().includes(status))
            }
            className="px-4 py-2 text-sm font-medium text-white bg-(--color-primary) border border-transparent rounded-md hover:bg-(--color-primary-hover) focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusModal;
