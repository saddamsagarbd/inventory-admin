// components/orders/OrderList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderTable from "./OrderTable";

const OrderList = ({ filters, onBulkStatusUpdate }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showBulkUpdate, setShowBulkUpdate] = useState(false);
  const [bulkStatus, setBulkStatus] = useState("");

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    };
    fetchOrders();
  }, [filters]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(orders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleBulkUpdate = () => {
    if (bulkStatus && selectedOrders.length > 0) {
      onBulkStatusUpdate(selectedOrders, bulkStatus);
      setSelectedOrders([]);
      setShowBulkUpdate(false);
      setBulkStatus("");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--color-primary)"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {selectedOrders.length > 0 && (
        <div className="bg-blue-50 border-b border-blue-200 p-4 flex justify-between items-center">
          <span className="text-sm text-(--color-primary) font-medium">
            {selectedOrders.length} order(s) selected
          </span>
          <button
            onClick={() => setShowBulkUpdate(true)}
            className="px-3 py-1 text-sm bg-(--color-primary) text-white rounded-md hover:bg-(--color-primary-hover)"
          >
            Bulk Update Status
          </button>
        </div>
      )}

      <OrderTable
        orders={orders}
        selectedOrders={selectedOrders}
        onSelectAll={handleSelectAll}
        onSelectOrder={handleSelectOrder}
      />

      {showBulkUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">Bulk Update Status</h3>
            <select
              value={bulkStatus}
              onChange={(e) => setBulkStatus(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md mb-4"
            >
              <option value="">Select Status</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowBulkUpdate(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkUpdate}
                className="px-4 py-2 text-white bg-(--color-primary) rounded-md hover:bg-(--color-primary-hover)"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock data
const mockOrders = [
  {
    id: "ORD-001",
    customer: { name: "John Doe", email: "john@example.com" },
    date: "2024-01-15",
    itemsCount: 3,
    total: 299.97,
    status: "pending",
    paymentStatus: "paid",
  },
  {
    id: "ORD-002",
    customer: { name: "Jane Smith", email: "jane@example.com" },
    date: "2024-01-14",
    itemsCount: 2,
    total: 159.98,
    status: "processing",
    paymentStatus: "paid",
  },
  // Add more mock orders
];

export default OrderList;
