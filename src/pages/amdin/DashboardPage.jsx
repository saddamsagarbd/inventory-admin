import { useState, useEffect } from "react";
import SalesChart from "./../../components/dashboard/SalesChart";
import TopCategories from "./../../components/dashboard/TopCategories";
import OrdersTable from "./../../components/dashboard/OrdersTable";
import StatCard from "./../../components/dashboard/StatCard";

const STATS = [
  {
    icon: "💰",
    label: "Total Revenue",
    value: "$24,580",
    change: "12.5% vs last month",
    up: true,
    iconBg: "bg-green-100",
  },
  {
    icon: "🛍️",
    label: "Total Orders",
    value: "1,284",
    change: "8.2% vs last month",
    up: true,
    iconBg: "bg-yellow-100",
  },
  {
    icon: "👥",
    label: "Customers",
    value: "3,921",
    change: "5.1% vs last month",
    up: true,
    iconBg: "bg-blue-100",
  },
  {
    icon: "📦",
    label: "Products",
    value: "486",
    change: "2 out of stock",
    up: false,
    iconBg: "bg-red-100",
  },
];

export default function DashboardPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 md:mb-7 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Welcome back, Admin! Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-2 md:gap-3 flex-shrink-0">
          <button className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-(--color-primary) bg-white border border-gray-200 hover:border-(--color-primary) hover:bg-(--color-primary)/10 rounded-xl transition-all">
            📥 Export
          </button>
          <button className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-white bg-(--color-primary) hover:bg-(--color-primary-hover) rounded-xl shadow-md shadow-(--color-primary)/20 transition-all">
            ➕ Add Product
          </button>
        </div>
      </div>

      {/* Stat Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Chart + Categories - Responsive Layout */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-5 mb-6">
        <div className="w-full lg:w-2/3">
          <SalesChart />
        </div>
        <div className="w-full lg:w-1/3">
          <TopCategories />
        </div>
      </div>

      {/* Orders Table */}
      <OrdersTable />
    </div>
  );
}
