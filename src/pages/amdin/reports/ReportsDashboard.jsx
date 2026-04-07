// pages/admin/reports/ReportsDashboard.jsx
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const REPORT_TABS = [
  {
    id: "sales",
    label: "Sales Report",
    icon: "📊",
    path: "/admin/reports/sales",
  },
  {
    id: "orders",
    label: "Order Report",
    icon: "🛍️",
    path: "/admin/reports/orders",
  },

  {
    id: "scheduled",
    label: "Scheduled Reports",
    icon: "⏰",
    path: "/admin/reports/scheduled",
  },
];

export default function ReportsDashboard() {
  const [activeTab, setActiveTab] = useState("sales");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Generate and analyze business insights
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {REPORT_TABS.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 text-sm font-medium whitespace-nowrap
                  transition-all duration-200 border-b-2
                  ${
                    activeTab === tab.id
                      ? "border-(--color-primary) text-(--color-primary)"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                <span className="text-base">{tab.icon}</span>
                {tab.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Report Content */}
        <Outlet />
      </div>
    </div>
  );
}
