// pages/OrderDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderTimeline from "./components/OrderTimeline";
import OrderStatusModal from "./components/OrderStatusModal";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    console.log("Fetching details for order ID:", id);
    // Fetch order details
    const fetchOrder = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setOrder(mockOrderDetails);
        setLoading(false);
      }, 1000);
    };
    fetchOrder();
  }, [id]);
  console.log("Order ID from URL:", id);
  console.log("Order Details:", order);
  const handleUpdateStatus = async (status, note, sendEmail) => {
    // API call to update status
    console.log("Updating status:", status, note, sendEmail);
    setShowStatusModal(false);
    // Refresh order data
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleSendEmail = () => {
    // Send email notification
    console.log("Sending email...");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--color-primary)"></div>
      </div>
    );
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order {order.id}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Placed on {new Date(order.date).toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowStatusModal(true)}
                className="px-4 py-2 cursor-pointer bg-(--color-primary) text-white rounded-md hover:bg-(--color-primary-hover)"
              >
                Update Status
              </button>
              <button
                onClick={handlePrintInvoice}
                className="px-4 py-2 cursor-pointer bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Print Invoice
              </button>
              <button
                onClick={handleSendEmail}
                className="px-4 py-2 cursor-pointer bg-(--color-primary) text-white rounded-md hover:bg-(--color-primary-hover)"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-medium text-black">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium text-black">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <h2 className="text-lg font-semibold p-6 border-b">
                Order Items
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            SKU: {item.sku}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-4 text-right font-medium"
                      >
                        Subtotal:
                      </td>
                      <td className="px-6 py-4 font-medium text-black">
                        ${order.subtotal.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-4 text-right font-medium"
                      >
                        Shipping:
                      </td>
                      <td className="px-6 py-4 font-medium text-black">
                        ${order.shipping.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-4 text-right font-bold"
                      >
                        Total:
                      </td>
                      <td className="px-6 py-4 font-bold text-lg text-black">
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">
                Customer Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-black">
                    {order.customer.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-black">
                    {order.customer.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-black">
                    {order.customer.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Shipping Address</p>
                  <p className="font-medium whitespace-pre-line text-black">
                    {order.customer.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">
                Payment Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Method</p>
                  <p className="font-medium text-black">
                    {order.payment.method}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Transaction ID</p>
                  <p className="font-medium">{order.payment.transactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <OrderTimeline timeline={order.timeline} />
          </div>
        </div>

        {/* Status Update Modal */}
        {showStatusModal && (
          <OrderStatusModal
            currentStatus={order.status}
            onClose={() => setShowStatusModal(false)}
            onUpdate={handleUpdateStatus}
          />
        )}
      </div>
    </div>
  );
};

// Mock order details
const mockOrderDetails = {
  id: "ORD-001",
  date: "2024-01-15T10:30:00",
  status: "processing",
  paymentStatus: "paid",
  subtotal: 249.98,
  shipping: 5.99,
  total: 255.97,
  customer: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main St\nApt 4B\nNew York, NY 10001\nUSA",
  },
  items: [
    { name: "Product 1", sku: "SKU001", quantity: 2, price: 49.99 },
    { name: "Product 2", sku: "SKU002", quantity: 1, price: 149.99 },
  ],
  payment: {
    method: "Credit Card (Visa)",
    transactionId: "txn_123456789",
  },
  timeline: [
    {
      status: "Order Placed",
      date: "2024-01-15T10:30:00",
      note: "Order received",
    },
    {
      status: "Payment Confirmed",
      date: "2024-01-15T10:31:00",
      note: "Payment successful",
    },
    {
      status: "Processing",
      date: "2024-01-15T11:00:00",
      note: "Order is being processed",
    },
  ],
};

export default OrderDetailsPage;
