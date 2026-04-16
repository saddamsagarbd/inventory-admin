// pages/admin/payments/PaymentDetails.jsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loading } from "../../../common/Loading";
import { METHOD_CONFIG, PAYMENTS_DATA, STATUS_CONFIG } from "./PaymentList";
// Mock data for demonstration

export default function PaymentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRefundModal, setShowRefundModal] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const paymentData = PAYMENTS_DATA.find((p) => p.id === id);
      setPayment(paymentData);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleRefund = () => {
    navigate(`/admin/payments/${id}/refund`);
  };

  if (loading) {
    return (
      <Loading type="spinner" size="lg" text="Loading payment details..." />
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Payment not found
          </h2>
          <p className="text-gray-500 mb-4">
            The payment you're looking for doesn't exist
          </p>
          <Link
            to="/admin/payments"
            className="text-(--color-primary) hover:underline"
          >
            Back to Payments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Link
                to="/admin/payments"
                className="text-(--color-primary) hover:underline text-sm mb-2 inline-block"
              >
                ← Back to Payments
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Payment Details
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Transaction ID: {payment.transactionId}
              </p>
            </div>
            <div className="flex gap-3">
              {payment.refundable && payment.status === "completed" && (
                <button
                  onClick={handleRefund}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  ↩️ Process Refund
                </button>
              )}
              <button className="px-4 py-2 border bg-(--color-primary) border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                📥 Download Receipt
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transaction Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Transaction Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase">
                    Transaction ID
                  </label>
                  <p className="font-mono text-sm font-semibold text-gray-900 mt-1">
                    {payment.transactionId}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">
                    Order ID
                  </label>
                  <Link
                    to={`/admin/orders/${payment.orderId}`}
                    className="text-sm text-(--color-primary) hover:underline block mt-1"
                  >
                    {payment.orderId} →
                  </Link>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">
                    Amount
                  </label>
                  <p className="text-2xl font-bold text-(--color-primary) mt-1">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(payment.amount)}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">
                    Status
                  </label>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${STATUS_CONFIG[payment.status]?.color}`}
                    >
                      {STATUS_CONFIG[payment.status]?.icon}{" "}
                      {STATUS_CONFIG[payment.status]?.label}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">
                    Payment Method
                  </label>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${METHOD_CONFIG[payment.method]?.color}`}
                    >
                      {METHOD_CONFIG[payment.method]?.icon}{" "}
                      {METHOD_CONFIG[payment.method]?.label}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">
                    Transaction Date
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {new Date(payment.date).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase">
                    Customer Name
                  </label>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {payment.customer}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">
                    Customer Email
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {payment.customer.toLowerCase().replace(/\s/g, ".")}
                    @example.com
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">
                    Phone Number
                  </label>
                  <p className="text-sm text-gray-900 mt-1">+880 1XXX-XXXXXX</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">
                    Billing Address
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    123 Main Street, Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            {/* Gateway Response */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Gateway Response
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                  {JSON.stringify(
                    {
                      status: payment.gatewayResponse,
                      transaction_id: payment.transactionId,
                      amount: payment.amount,
                      currency: "USD",
                      payment_method: payment.method,
                      timestamp: payment.date,
                      gateway:
                        payment.method === "bkash"
                          ? "bKash API v2.0"
                          : payment.method === "nagad"
                            ? "Nagad API v1.5"
                            : "Stripe API",
                      response_code:
                        payment.status === "completed"
                          ? "200"
                          : payment.status === "pending"
                            ? "202"
                            : "400",
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Timeline
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-(--color-primary)">💰</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Payment Created
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(payment.date).toLocaleString()}
                    </p>
                  </div>
                </div>
                {payment.status === "completed" && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-(--color-primary)">✓</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Payment Completed
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(payment.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
                {payment.status === "refunded" && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600">↺</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Refund Processed
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-(--color-primary) text-white rounded-lg hover:bg-(--color-primary-hover) transition-colors">
                  Send Receipt Email
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Download Invoice
                </button>
                {payment.status === "pending" && (
                  <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Cancel Transaction
                  </button>
                )}
              </div>
            </div>

            {/* Payment Metadata */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Additional Information
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment ID:</span>
                  <span className="font-mono text-gray-900">{payment.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">IP Address:</span>
                  <span className="font-mono text-gray-900">192.168.1.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">User Agent:</span>
                  <span className="text-gray-900 text-right">
                    Mozilla/5.0...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
