import { useState } from "react";

/**
 * SearchBar
 * Expandable search input — shows icon-only on small screens, full bar on md+.
 */
export default function SearchBar() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`
        flex items-center gap-2 rounded-xl px-3 py-2
        bg-gray-50 border transition-all duration-200
        ${focused ? "border-(--color-primary) ring-2 ring-green-100 w-56 md:w-64" : "border-gray-200 hover:border-(--color-primary) w-10 md:w-60"}
      `}
    >
      <span className="text-gray-400 text-sm flex-shrink-0" aria-hidden>
        🔍
      </span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search products, orders…"
        aria-label="Search"
        className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full font-[Sora,sans-serif] hidden md:block"
      />
    </div>
  );
}
