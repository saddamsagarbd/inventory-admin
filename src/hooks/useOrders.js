// hooks/useOrders.js
import { useState, useEffect } from "react";

export const useOrders = (filters) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, [filters, pagination.page]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...filters,
          page: pagination.page,
          limit: pagination.limit,
        }),
      });
      const data = await response.json();
      setOrders(data.orders);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status, note, sendEmail) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, note, sendEmail }),
      });
      const updatedOrder = await response.json();
      setOrders(
        orders.map((order) => (order.id === orderId ? updatedOrder : order)),
      );
      return updatedOrder;
    } catch (err) {
      throw err;
    }
  };

  const bulkUpdateStatus = async (orderIds, status) => {
    try {
      const response = await fetch("/api/orders/bulk-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderIds, status }),
      });
      const updatedOrders = await response.json();
      setOrders(
        orders.map((order) => {
          const updated = updatedOrders.find((u) => u.id === order.id);
          return updated || order;
        }),
      );
      return updatedOrders;
    } catch (err) {
      throw err;
    }
  };

  return {
    orders,
    loading,
    error,
    pagination,
    updateOrderStatus,
    bulkUpdateStatus,
    setPage: (page) => setPagination({ ...pagination, page }),
  };
};
