export default function StatCard({ icon, label, value, change, up, iconBg }) {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-green-100 p-4 md:p-5 flex items-start gap-3 md:gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
      <div
        className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl md:text-2xl flex-shrink-0 ${iconBg}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] md:text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
          {label}
        </p>
        <p className="text-xl md:text-2xl font-bold text-gray-900 font-mono my-0.5 md:my-1 tracking-tight">
          {value}
        </p>
        <p
          className={`text-[11px] md:text-xs font-semibold flex items-center gap-1 ${
            up ? "text-(--color-primary)" : "text-red-500"
          }`}
        >
          {up ? "▲" : "▼"} {change}
        </p>
      </div>
    </div>
  );
}
