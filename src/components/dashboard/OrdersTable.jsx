import { useState, useEffect } from "react";

const ORDERS = [
  {
    id: "#ORD-5812",
    customer: "Rahim Uddin",
    items: 3,
    date: "31 Mar 2026",
    amount: "$128.00",
    status: "Delivered",
  },
  {
    id: "#ORD-5811",
    customer: "Karim Hossain",
    items: 5,
    date: "31 Mar 2026",
    amount: "$245.50",
    status: "Processing",
  },
  {
    id: "#ORD-5810",
    customer: "Nasrin Akter",
    items: 2,
    date: "30 Mar 2026",
    amount: "$64.00",
    status: "Pending",
  },
  {
    id: "#ORD-5809",
    customer: "Sohel Rana",
    items: 7,
    date: "30 Mar 2026",
    amount: "$389.00",
    status: "Cancelled",
  },
  {
    id: "#ORD-5808",
    customer: "Fatema Begum",
    items: 4,
    date: "29 Mar 2026",
    amount: "$172.25",
    status: "Delivered",
  },
];

const STATUS_STYLES = {
  Delivered: "bg-green-100 text-green-800",
  Processing: "bg-blue-100 text-blue-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

const STATUS_ICONS = {
  Delivered: "✓",
  Processing: "⏳",
  Pending: "🕐",
  Cancelled: "✕",
};

export default function OrdersTable() {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleRow = (orderId) => {
    setExpandedRow(expandedRow === orderId ? null : orderId);
  };

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-green-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 border-b border-gray-100">
        <h3 className="text-sm md:text-base font-bold text-gray-800">
          🛍️ Recent Orders
        </h3>
        <button className="text-xs md:text-sm text-(--color-primary) font-semibold hover:underline">
          View All Orders →
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {[
                "Order ID",
                "Customer",
                "Items",
                "Date",
                "Amount",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-[10px] uppercase tracking-widest text-gray-400 font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((order) => (
              <tr
                key={order.id}
                className="border-t border-gray-100 hover:bg-green-50/40 transition-colors"
              >
                <td className="px-5 py-3.5">
                  <span className="font-mono text-xs text-gray-400">
                    {order.id}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm font-medium text-gray-700">
                  {order.customer}
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-500">
                  {order.items} items
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="px-5 py-3.5 font-mono text-sm font-bold text-gray-800">
                  {order.amount}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-3.5">
                  <button className="text-xs font-semibold text-(--color-primary) border border-(--color-primary) hover:bg-(--color-primary) hover:text-white px-3 py-1.5 rounded-lg transition-all">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-100">
        {ORDERS.map((order) => (
          <div
            key={order.id}
            className="px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleRow(order.id)}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-semibold text-gray-600">
                    {order.id}
                  </span>
                  <StatusBadge status={order.status} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {order.customer}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {order.items} items • {order.date}
                    </p>
                  </div>
                  <span className="font-mono text-base font-bold text-(--color-primary)">
                    {order.amount}
                  </span>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 ml-2 transition-transform duration-200 ${
                  expandedRow === order.id ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Expanded Details */}
            {expandedRow === order.id && (
              <div className="mt-3 pt-3 border-t border-gray-100 animate-fadeIn">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Customer</p>
                    <p className="text-sm font-medium text-gray-700 mt-0.5">
                      {order.customer}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Items</p>
                    <p className="text-sm font-medium text-gray-700 mt-0.5">
                      {order.items}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="text-sm font-medium text-gray-700 mt-0.5">
                      {order.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Amount</p>
                    <p className="text-sm font-medium text-(--color-primary) mt-0.5">
                      {order.amount}
                    </p>
                  </div>
                </div>
                <button className="w-full mt-3 text-xs font-semibold text-(--color-primary) border border-(--color-primary) hover:bg-(--color-primary) hover:text-white px-3 py-2 rounded-lg transition-all">
                  View Order Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-[11px] font-bold ${STATUS_STYLES[status]}`}
    >
      <span className="text-xs">{STATUS_ICONS[status]}</span>
      <span className="hidden xs:inline">{status}</span>
    </span>
  );
}
