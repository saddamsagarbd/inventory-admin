import { useState, useEffect } from "react";

const CATEGORIES = [
  {
    icon: "🥦",
    name: "Vegetables",
    products: 142,
    orders: 38,
    revenue: "$4,320",
    bg: "bg-green-50",
  },
  {
    icon: "🍎",
    name: "Fruits",
    products: 98,
    orders: 55,
    revenue: "$3,210",
    bg: "bg-yellow-50",
  },
  {
    icon: "🥩",
    name: "Meat & Fish",
    products: 64,
    orders: 29,
    revenue: "$5,840",
    bg: "bg-red-50",
  },
  {
    icon: "🥛",
    name: "Dairy",
    products: 47,
    orders: 72,
    revenue: "$2,190",
    bg: "bg-blue-50",
  },
];

export default function TopCategories() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-green-100 shadow-sm overflow-hidden h-full">
      <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 border-b border-gray-100">
        <h3 className="text-sm md:text-base font-bold text-gray-800">
          🔥 Top Categories
        </h3>
        <button className="text-xs md:text-sm text-(--color-primary) font-semibold hover:underline">
          See All →
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat.name}
            className="flex items-center gap-2 md:gap-3 px-4 md:px-5 py-3 md:py-3.5 hover:bg-gray-50 transition-colors"
          >
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-base md:text-lg flex-shrink-0 ${cat.bg}`}
            >
              {cat.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base font-semibold text-gray-800 truncate">
                {cat.name}
              </p>
              <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">
                {cat.products} products · {cat.orders} orders
              </p>
            </div>
            <span className="font-mono text-xs md:text-sm font-bold text-(--color-primary) whitespace-nowrap">
              {cat.revenue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
