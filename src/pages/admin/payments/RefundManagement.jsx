// pages/admin/payments/RefundManagement.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Loading } from "../../../common/Loading";
import { METHOD_CONFIG, PAYMENTS_DATA } from "./PaymentList";
export default function RefundManagement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [refundAmount, setRefundAmount] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const paymentData = PAYMENTS_DATA.find((p) => p.id === id);
      setPayment(paymentData);
      setRefundAmount(paymentData?.amount.toString() || "");
      setLoading(false);
    }, 500);
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    const amount = parseFloat(refundAmount);

    if (!refundAmount) {
      newErrors.refundAmount = "Refund amount is required";
    } else if (isNaN(amount) || amount <= 0) {
      newErrors.refundAmount = "Please enter a valid amount";
    } else if (amount > payment.amount) {
      newErrors.refundAmount = `Refund amount cannot exceed $${payment.amount}`;
    }

    if (!reason.trim()) {
      newErrors.reason = "Please provide a reason for refund";
    } else if (reason.length < 10) {
      newErrors.reason =
        "Please provide a more detailed reason (minimum 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRefund = async () => {
    if (!validateForm()) return;

    setProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      navigate(`/admin/payments/${id}`, {
        state: { message: "Refund processed successfully!" },
      });
    }, 2000);
  };

  if (loading) {
    return (
      <Loading type="spinner" size="lg" text="Loading refund details..." />
    );
  }

  if (!payment || !payment.refundable) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Refund Not Available
          </h2>
          <p className="text-gray-500 mb-4">
            This payment cannot be refunded. It may already be refunded or not
            eligible.
          </p>
          <Link
            to={`/admin/payments/${id}`}
            className="text-(--color-primary) hover:underline"
          >
            Back to Payment Details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            to={`/admin/payments/${id}`}
            className="text-(--color-primary) hover:underline text-sm inline-block mb-2"
          >
            ← Back to Payment Details
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Process Refund
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Transaction ID: {payment.transactionId}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Payment Summary */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase">
                  Original Amount
                </label>
                <p className="text-2xl font-bold text-gray-900">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(payment.amount)}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">
                  Payment Method
                </label>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {METHOD_CONFIG[payment.method]?.label}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">
                  Customer
                </label>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {payment.customer}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">
                  Order ID
                </label>
                <Link
                  to={`/admin/orders/${payment.orderId}`}
                  className="text-sm text-green-600 hover:underline block mt-1"
                >
                  {payment.orderId}
                </Link>
              </div>
            </div>
          </div>

          {/* Refund Form */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Refund Information
            </h2>

            <div className="space-y-6">
              {/* Refund Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Refund Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    className={`w-full pl-8 pr-4 py-2 text-black cursor-pointer border ${errors.refundAmount ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    placeholder="0.00"
                  />
                </div>
                {errors.refundAmount && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.refundAmount}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Maximum refund amount:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(payment.amount)}
                </p>
              </div>

              {/* Refund Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Refund Reason <span className="text-red-500">*</span>
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className={`w-full px-4 py-2 text-black cursor-pointer border ${errors.reason ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                >
                  <option value="">Select a reason</option>
                  <option value="Customer requested refund">
                    Customer requested refund
                  </option>
                  <option value="Product out of stock">
                    Product out of stock
                  </option>
                  <option value="Wrong item shipped">Wrong item shipped</option>
                  <option value="Damaged product">Damaged product</option>
                  <option value="Delayed delivery">Delayed delivery</option>
                  <option value="Duplicate payment">Duplicate payment</option>
                  <option value="Other">Other</option>
                </select>
                {errors.reason && (
                  <p className="mt-1 text-xs text-red-500">{errors.reason}</p>
                )}
              </div>

              {/* Additional Notes */}
              {reason === "Other" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Please provide more details about the refund..."
                  />
                </div>
              )}

              {/* Warning Message */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <span className="text-yellow-600 text-xl">⚠️</span>
                  <div>
                    <p className="text-sm font-semibold text-yellow-800">
                      Important Notice
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Once processed, this refund cannot be reversed. The amount
                      will be credited back to the customer's original payment
                      method within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleRefund}
                  disabled={processing}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Processing Refund...
                    </span>
                  ) : (
                    "↺ Process Refund"
                  )}
                </button>
                <Link
                  to={`/admin/payments/${id}`}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
