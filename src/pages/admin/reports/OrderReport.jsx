// pages/admin/reports/OrderReport.jsx
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Loading } from "../../../common/Loading";
import SummaryCard from "./components/SummeryCard";

const ORDER_STATUS_DATA = [
  { name: "Delivered", value: 2850, color: "#10b981" },
  { name: "Processing", value: 850, color: "#3b82f6" },
  { name: "Pending", value: 320, color: "#f59e0b" },
  { name: "Cancelled", value: 205, color: "#ef4444" },
];

const HOURLY_DATA = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  orders: Math.floor(Math.random() * 50) + (i > 8 && i < 22 ? 30 : 10),
}));

const WEEKDAY_DATA = [
  { day: "Monday", orders: 620 },
  { day: "Tuesday", orders: 645 },
  { day: "Wednesday", orders: 680 },
  { day: "Thursday", orders: 710 },
  { day: "Friday", orders: 890 },
  { day: "Saturday", orders: 750 },
  { day: "Sunday", orders: 580 },
];

export default function OrderReport() {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState("month");

  useEffect(() => {
    loadOrderData();
  }, [dateRange]);

  const loadOrderData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  if (loading) return <Loading type="spinner" text="Loading order data..." />;

  return (
    <div className="space-y-6">
      {/* Date Range */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {["week", "month", "quarter", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1.5 text-sm rounded-lg capitalize ${
                dateRange === range
                  ? "bg-(--color-primary) text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <SummaryCard
          title="Total Orders"
          value="4,225"
          change="+8.2%"
          icon="🛍️"
          trend="up"
        />
        <SummaryCard
          title="Completed Orders"
          value="2,850"
          change="+12%"
          icon="✅"
          trend="up"
        />
        <SummaryCard
          title="Cancellation Rate"
          value="4.85%"
          change="-1.2%"
          icon="❌"
          trend="down"
        />
        <SummaryCard
          title="Return Rate"
          value="2.3%"
          change="-0.5%"
          icon="↺"
          trend="down"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Orders by Status
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ORDER_STATUS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {ORDER_STATUS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders by Day of Week */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Orders by Day
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKDAY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Orders by Hour Heatmap */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Order Volume by Hour
        </h3>
        <div className="overflow-x-auto">
          <div className="min-w-[800px] grid grid-cols-24 gap-1">
            {HOURLY_DATA.map((data) => (
              <div key={data.hour} className="text-center">
                <div
                  className="bg-(--color-primary) rounded-t-lg transition-all"
                  style={{
                    height: `${(data.orders / 50) * 100}px`,
                    opacity: 0.3 + (data.orders / 50) * 0.7,
                  }}
                />
                <div className="text-[10px] text-gray-500 mt-1">
                  {data.hour}
                </div>
                <div className="text-xs font-semibold text-gray-700">
                  {data.orders}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Order Trends & Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InsightCard
            title="Peak Order Time"
            value="7:00 PM - 9:00 PM"
            description="32% of daily orders"
            icon="⏰"
          />
          <InsightCard
            title="Best Day"
            value="Friday"
            description="890 orders on average"
            icon="📅"
          />
          <InsightCard
            title="Average Processing Time"
            value="2.4 hours"
            description="-15% from last month"
            icon="⚡"
          />
        </div>
      </div>
    </div>
  );
}

const InsightCard = ({ title, value, description, icon }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xl">{icon}</span>
      <h4 className="text-sm font-medium text-gray-600">{title}</h4>
    </div>
    <p className="text-xl font-bold text-gray-900 mb-1">{value}</p>
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);
