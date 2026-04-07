// pages/admin/reports/SalesReport.jsx
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Loading } from "../../../common/Loading";
import {
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "../../../utils/exportUtils";
import SummaryCard from "./components/SummeryCard";

const SALES_DATA = {
  daily: [
    { date: "2026-03-25", sales: 12500, orders: 145, avgOrderValue: 86.21 },
    { date: "2026-03-26", sales: 13800, orders: 158, avgOrderValue: 87.34 },
    { date: "2026-03-27", sales: 14200, orders: 162, avgOrderValue: 87.65 },
    { date: "2026-03-28", sales: 16500, orders: 178, avgOrderValue: 92.7 },
    { date: "2026-03-29", sales: 18900, orders: 195, avgOrderValue: 96.92 },
    { date: "2026-03-30", sales: 17200, orders: 182, avgOrderValue: 94.51 },
    { date: "2026-03-31", sales: 24580, orders: 220, avgOrderValue: 111.73 },
  ],
  weekly: [
    { week: "Week 1", sales: 89400, orders: 980, avgOrderValue: 91.22 },
    { week: "Week 2", sales: 92100, orders: 1010, avgOrderValue: 91.19 },
    { week: "Week 3", sales: 98700, orders: 1085, avgOrderValue: 90.97 },
    { week: "Week 4", sales: 105200, orders: 1150, avgOrderValue: 91.48 },
  ],
  monthly: [
    { month: "Jan", sales: 342000, orders: 3850, avgOrderValue: 88.83 },
    { month: "Feb", sales: 356000, orders: 3980, avgOrderValue: 89.45 },
    { month: "Mar", sales: 385000, orders: 4225, avgOrderValue: 91.12 },
  ],
  yearly: [
    { year: "2023", sales: 3840000, orders: 42500, avgOrderValue: 90.35 },
    { year: "2024", sales: 4120000, orders: 45200, avgOrderValue: 91.15 },
    { year: "2025", sales: 4450000, orders: 48500, avgOrderValue: 91.75 },
  ],
};

const TOP_PRODUCTS = [
  {
    rank: 1,
    name: "Fresh Organic Apples",
    orders: 245,
    revenue: 3675.0,
    growth: "+15%",
  },
  {
    rank: 2,
    name: "Premium Basmati Rice",
    orders: 198,
    revenue: 5940.0,
    growth: "+8%",
  },
  {
    rank: 3,
    name: "Free Range Eggs (12pcs)",
    orders: 187,
    revenue: 1309.0,
    growth: "+22%",
  },
  {
    rank: 4,
    name: "Chicken Breast (1kg)",
    orders: 156,
    revenue: 2340.0,
    growth: "+5%",
  },
  {
    rank: 5,
    name: "Fresh Broccoli",
    orders: 145,
    revenue: 725.0,
    growth: "+12%",
  },
];

export default function SalesReport() {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState("week");
  const [customDate, setCustomDate] = useState({ start: "", end: "" });
  const [chartType, setChartType] = useState("line");
  const [salesData, setSalesData] = useState(SALES_DATA.weekly);
  const [summary, setSummary] = useState({
    totalSales: 385892,
    totalOrders: 4225,
    avgOrderValue: 91.34,
    growth: 12.5,
  });

  useEffect(() => {
    loadReportData();
  }, [dateRange, customDate]);

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Loads report data based on selected date range.
   *
   * @param {string} dateRange - selected date range (today, week, month, year)
   *
   * @returns {void}
   *
   * @private
   */
  /*******  0de655d4-af61-4b9b-b02e-d81692350aad  *******/
  const loadReportData = () => {
    setLoading(true);
    setTimeout(() => {
      let data;
      switch (dateRange) {
        case "today":
          data = SALES_DATA.daily.slice(-1);
          break;
        case "week":
          data = SALES_DATA.daily;
          break;
        case "month":
          data = SALES_DATA.weekly;
          break;
        case "year":
          data = SALES_DATA.monthly;
          break;
        default:
          data = SALES_DATA.weekly;
      }
      setSalesData(data);
      setLoading(false);
    }, 500);
  };

  const handleExport = (format) => {
    const exportData = salesData.map((item) => ({
      "Date/Period": item.date || item.week || item.month || item.year,
      "Total Sales": `$${item.sales.toLocaleString()}`,
      "Number of Orders": item.orders,
      "Average Order Value": `$${item.avgOrderValue.toFixed(2)}`,
    }));

    switch (format) {
      case "csv":
        exportToCSV(exportData, `sales_report_${dateRange}_${Date.now()}.csv`);
        break;
      case "excel":
        exportToExcel(
          exportData,
          `sales_report_${dateRange}_${Date.now()}.xlsx`,
        );
        break;
      case "pdf":
        exportToPDF(exportData, `sales_report_${dateRange}_${Date.now()}.pdf`);
        break;
    }
  };

  const DateRangePicker = () => (
    <div className="flex flex-wrap gap-2">
      {["today", "week", "month", "year", "custom"].map((range) => (
        <button
          key={range}
          onClick={() => setDateRange(range)}
          className={`px-3 py-1.5 text-sm rounded-lg capitalize transition-colors ${
            dateRange === range
              ? "bg-(--color-primary) text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {range}
        </button>
      ))}
      {dateRange === "custom" && (
        <div className="flex gap-2 ml-2">
          <input
            type="date"
            className="px-3 py-1.5 text-sm border rounded-lg"
            onChange={(e) =>
              setCustomDate({ ...customDate, start: e.target.value })
            }
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            className="px-3 py-1.5 text-sm border rounded-lg"
            onChange={(e) =>
              setCustomDate({ ...customDate, end: e.target.value })
            }
          />
        </div>
      )}
    </div>
  );

  const ChartControls = () => (
    <div className="flex gap-2">
      {["line", "area", "bar"].map((type) => (
        <button
          key={type}
          onClick={() => setChartType(type)}
          className={`px-3 py-1 text-sm rounded-lg capitalize ${
            chartType === type
              ? "bg-green-100 text-(--color-primary)"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );

  if (loading) return <Loading type="spinner" text="Loading report data..." />;

  return (
    <div className="space-y-6">
      {/* Date Range & Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-5">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <DateRangePicker />
          <div className="flex gap-2">
            <ChartControls />
            <div className="relative group">
              <button className="px-4 py-1.5 bg-gray-100 rounded-lg text-sm">
                📥 Export
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border hidden group-hover:block z-10">
                <button
                  onClick={() => handleExport("csv")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                >
                  CSV
                </button>
                <button
                  onClick={() => handleExport("excel")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Excel
                </button>
                <button
                  onClick={() => handleExport("pdf")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                >
                  PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <SummaryCard
          title="Total Sales"
          value={`$${summary.totalSales.toLocaleString()}`}
          change={`+${summary.growth}%`}
          icon="💰"
          trend="up"
        />
        <SummaryCard
          title="Total Orders"
          value={summary.totalOrders.toLocaleString()}
          change="+8.2%"
          icon="🛍️"
          trend="up"
        />
        <SummaryCard
          title="Average Order Value"
          value={`$${summary.avgOrderValue.toFixed(2)}`}
          change="+5.3%"
          icon="📊"
          trend="up"
        />
        <SummaryCard
          title="Conversion Rate"
          value="3.24%"
          change="+0.8%"
          icon="🎯"
          trend="up"
        />
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Sales Trend</h3>
          <span className="text-xs text-gray-500">vs previous period</span>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" && (
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey={Object.keys(salesData[0])[0]}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981" }}
                />
              </LineChart>
            )}
            {chartType === "area" && (
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey={Object.keys(salesData[0])[0]} />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#10b981"
                  fill="url(#colorSales)"
                />
              </AreaChart>
            )}
            {chartType === "bar" && (
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey={Object.keys(salesData[0])[0]} />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
                />
                <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            🏆 Top Performing Products
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                  Product Name
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">
                  Orders
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">
                  Revenue
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {TOP_PRODUCTS.map((product) => (
                <tr key={product.rank} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        product.rank === 1
                          ? "bg-yellow-100 text-yellow-700"
                          : product.rank === 2
                            ? "bg-gray-100 text-gray-700"
                            : product.rank === 3
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-50 text-gray-500"
                      }`}
                    >
                      {product.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-700">
                    {product.orders}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                    ${product.revenue.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-semibold text-(--color-primary)">
                      {product.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
