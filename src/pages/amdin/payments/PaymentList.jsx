// pages/admin/payments/PaymentList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { exportToCSV } from "../../../utils/exportUtils";
import { Loading } from "../../../common/Loading";

export const PAYMENTS_DATA = [
  {
    id: "PAY-001",
    transactionId: "TXN123456789",
    orderId: "ORD-5812",
    customer: "Rahim Uddin",
    amount: 128.0,
    method: "bkash",
    status: "completed",
    date: "2026-03-31T10:30:00",
    gatewayResponse: "Success",
    refundable: true,
  },
  {
    id: "PAY-002",
    transactionId: "TXN123456790",
    orderId: "ORD-5811",
    customer: "Karim Hossain",
    amount: 245.5,
    method: "nagad",
    status: "pending",
    date: "2026-03-31T09:15:00",
    gatewayResponse: "Processing",
    refundable: false,
  },
  {
    id: "PAY-003",
    transactionId: "TXN123456791",
    orderId: "ORD-5810",
    customer: "Nasrin Akter",
    amount: 64.0,
    method: "credit_card",
    status: "completed",
    date: "2026-03-30T14:20:00",
    gatewayResponse: "Success",
    refundable: true,
  },
  {
    id: "PAY-004",
    transactionId: "TXN123456792",
    orderId: "ORD-5809",
    customer: "Sohel Rana",
    amount: 389.0,
    method: "bkash",
    status: "failed",
    date: "2026-03-30T11:45:00",
    gatewayResponse: "Insufficient balance",
    refundable: false,
  },
  {
    id: "PAY-005",
    transactionId: "TXN123456793",
    orderId: "ORD-5808",
    customer: "Fatema Begum",
    amount: 172.25,
    method: "cash_on_delivery",
    status: "pending",
    date: "2026-03-29T16:00:00",
    gatewayResponse: "Awaiting payment",
    refundable: false,
  },
  {
    id: "PAY-006",
    transactionId: "TXN123456794",
    orderId: "ORD-5807",
    customer: "Minhaz Rahman",
    amount: 95.75,
    method: "nagad",
    status: "refunded",
    date: "2026-03-28T13:10:00",
    gatewayResponse: "Refund processed",
    refundable: false,
  },
];

export const STATUS_CONFIG = {
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-800",
    icon: "✓",
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
    icon: "⏳",
  },
  failed: { label: "Failed", color: "bg-red-100 text-red-800", icon: "✕" },
  refunded: {
    label: "Refunded",
    color: "bg-gray-100 text-gray-800",
    icon: "↺",
  },
};

export const METHOD_CONFIG = {
  bkash: { label: "bKash", icon: "💚", color: "bg-pink-50 text-pink-700" },
  nagad: { label: "Nagad", icon: "🧡", color: "bg-orange-50 text-orange-700" },
  credit_card: {
    label: "Credit Card",
    icon: "💳",
    color: "bg-blue-50 text-blue-700",
  },
  cash_on_delivery: {
    label: "Cash on Delivery",
    icon: "💰",
    color: "bg-gray-50 text-gray-700",
  },
};

export default function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    method: "",
    startDate: "",
    endDate: "",
  });
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Simulate API call
    setTimeout(() => {
      setPayments(PAYMENTS_DATA);
      setFilteredPayments(PAYMENTS_DATA);
      setLoading(false);
    }, 1000);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    filterPayments();
  }, [searchTerm, filters, payments]);

  const filterPayments = () => {
    let filtered = [...payments];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.transactionId
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.customer.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(
        (payment) => payment.status === filters.status,
      );
    }

    // Method filter
    if (filters.method) {
      filtered = filtered.filter(
        (payment) => payment.method === filters.method,
      );
    }

    // Date range filter
    if (filters.startDate) {
      filtered = filtered.filter(
        (payment) => new Date(payment.date) >= new Date(filters.startDate),
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(
        (payment) => new Date(payment.date) <= new Date(filters.endDate),
      );
    }

    setFilteredPayments(filtered);
  };

  const handleExport = () => {
    const exportData = filteredPayments.map((payment) => ({
      "Transaction ID": payment.transactionId,
      "Order ID": payment.orderId,
      Customer: payment.customer,
      Amount: `$${payment.amount}`,
      Method: METHOD_CONFIG[payment.method]?.label || payment.method,
      Status: STATUS_CONFIG[payment.status]?.label || payment.status,
      Date: new Date(payment.date).toLocaleString(),
    }));
    exportToCSV(exportData, `payments_export_${new Date().toISOString()}.csv`);
  };

  const handleSelectAll = () => {
    if (selectedPayments.length === filteredPayments.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(filteredPayments.map((p) => p.id));
    }
  };

  const handleSelectPayment = (id) => {
    if (selectedPayments.includes(id)) {
      setSelectedPayments(selectedPayments.filter((p) => p !== id));
    } else {
      setSelectedPayments([...selectedPayments, id]);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <Loading type="spinner" size="lg" text="Loading payments..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Payment Records
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all transactions
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search by transaction ID, order ID or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="px-4 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>

            {/* Method Filter */}
            <select
              value={filters.method}
              onChange={(e) =>
                setFilters({ ...filters, method: e.target.value })
              }
              className="px-4 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Methods</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="credit_card">Credit Card</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
            </select>

            {/* Date Range */}
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
              className="px-4 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Start Date"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
              className="px-4 py-2 border  text-black cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="End Date"
            />

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-(--color-primary) text-white rounded-lg hover:bg-(--color-primary-hover) transition-colors"
            >
              📥 Export
            </button>
          </div>

          {/* Active Filters Display */}
          {(filters.status ||
            filters.method ||
            filters.startDate ||
            filters.endDate) && (
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-black">Active filters:</span>
              {filters.status && (
                <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs flex items-center gap-1">
                  Status: {STATUS_CONFIG[filters.status]?.label}
                  <button
                    onClick={() => setFilters({ ...filters, status: "" })}
                    className="hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              )}
              {filters.method && (
                <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs flex items-center gap-1">
                  Method: {METHOD_CONFIG[filters.method]?.label}
                  <button
                    onClick={() => setFilters({ ...filters, method: "" })}
                    className="hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              )}
              <button
                onClick={() =>
                  setFilters({
                    status: "",
                    method: "",
                    startDate: "",
                    endDate: "",
                  })
                }
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedPayments.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center justify-between">
            <span className="text-sm text-(--color-primary)">
              {selectedPayments.length} payment(s) selected
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm text-black cursor-pointer bg-white border border-green-300 rounded-lg hover:bg-green-100">
                Export Selected
              </button>
              <button className="px-3 py-1 text-sm  cursor-pointer bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                Bulk Action
              </button>
            </div>
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={
                        selectedPayments.length === filteredPayments.length &&
                        filteredPayments.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Method
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedPayments.includes(payment.id)}
                        onChange={() => handleSelectPayment(payment.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/admin/payments/${payment.id}`}
                        className="font-mono text-sm text-green-600 hover:underline"
                      >
                        {payment.transactionId}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/admin/orders/${payment.orderId}`}
                        className="text-sm text-gray-700 hover:text-green-600"
                      >
                        {payment.orderId}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {payment.customer}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                      {formatAmount(payment.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${METHOD_CONFIG[payment.method]?.color}`}
                      >
                        {METHOD_CONFIG[payment.method]?.icon}{" "}
                        {METHOD_CONFIG[payment.method]?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${STATUS_CONFIG[payment.status]?.color}`}
                      >
                        {STATUS_CONFIG[payment.status]?.icon}{" "}
                        {STATUS_CONFIG[payment.status]?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {formatDate(payment.date)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        to={`/admin/payments/${payment.id}`}
                        className="text-(--color-primary) hover:text-(--color-primary-hover) text-sm font-medium"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredPayments.length} of {payments.length} payments
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-1 bg-(--color-primary) text-white rounded-lg hover:bg-(--color-primary-hover)">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedPayments.includes(payment.id)}
                    onChange={() => handleSelectPayment(payment.id)}
                    className="rounded border-gray-300"
                  />
                  <div>
                    <Link
                      to={`/admin/payments/${payment.id}`}
                      className="font-mono text-sm font-semibold text-green-600"
                    >
                      {payment.transactionId}
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {formatDate(payment.date)}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_CONFIG[payment.status]?.color}`}
                >
                  {STATUS_CONFIG[payment.status]?.label}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Order ID:</span>
                  <Link
                    to={`/admin/orders/${payment.orderId}`}
                    className="text-sm font-medium text-gray-700"
                  >
                    {payment.orderId}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Customer:</span>
                  <span className="text-sm font-medium text-gray-700">
                    {payment.customer}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Amount:</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatAmount(payment.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Method:</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${METHOD_CONFIG[payment.method]?.color}`}
                  >
                    {METHOD_CONFIG[payment.method]?.icon}{" "}
                    {METHOD_CONFIG[payment.method]?.label}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                <Link
                  to={`/admin/payments/${payment.id}`}
                  className="flex-1 text-center px-3 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100"
                >
                  View Details
                </Link>
                {payment.refundable && payment.status === "completed" && (
                  <Link
                    to={`/admin/payments/${payment.id}/refund`}
                    className="px-3 py-2 bg-orange-50 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-100"
                  >
                    Refund
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPayments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="text-6xl mb-4">💳</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No payments found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
