const SummaryCard = ({ title, value, change, icon, trend }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-3">
      <span className="text-2xl">{icon}</span>
      <span
        className={`text-xs font-semibold ${trend === "up" ? "text-(--color-primary)" : "text-red-600"}`}
      >
        {trend === "up" ? "▲" : "▼"} {change}
      </span>
    </div>
    <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
    <p className="text-xs text-gray-500 mt-1">{title}</p>
  </div>
);
export default SummaryCard;
