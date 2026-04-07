import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", sales: 4000, revenue: 2400 },
  { name: "Feb", sales: 3000, revenue: 1398 },
  { name: "Mar", sales: 5000, revenue: 3800 },
  { name: "Apr", sales: 2780, revenue: 3908 },
  { name: "May", sales: 1890, revenue: 4800 },
  { name: "Jun", sales: 2390, revenue: 3800 },
  { name: "Jul", sales: 3490, revenue: 4300 },
];

export default function SalesChart() {
  const [chartHeight, setChartHeight] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartHeight(250);
      } else if (window.innerWidth < 768) {
        setChartHeight(280);
      } else {
        setChartHeight(300);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-green-100 shadow-sm p-4 md:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <div>
          <h3 className="text-sm md:text-base font-bold text-gray-800">
            📈 Sales Overview
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Monthly revenue & order trends
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-2 md:px-3 py-1 text-xs font-semibold text-(--color-primary) bg-(--color-primary)/10 rounded-lg">
            Revenue
          </button>
          <button className="px-2 md:px-3 py-1 text-xs font-semibold text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
            Orders
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
            tickLine={false}
            tickFormatter={(value) =>
              window.innerWidth < 640 ? `$${value / 1000}k` : `$${value}`
            }
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: window.innerWidth < 640 ? "10px" : "12px",
              padding: window.innerWidth < 640 ? "6px 10px" : "8px 12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#colorRevenue)"
            name="Revenue"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
