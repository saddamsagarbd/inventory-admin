import { Link } from "react-router-dom";

/**
 * NavItem
 * Single navigation link with icon, label, badge, and tooltip support.
 */
export default function NavItem({
  item,
  collapsed,
  isActive,
  isMobile,
  onNavClick,
}) {
  const active = isActive(item.path);

  return (
    <div>
      <Link
        to={item.path}
        onClick={(e) => {
          if (item.sub) e.preventDefault();
          onNavClick(item.id, item.path, !!item.sub);
        }}
        className={`
          group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
          transition-all duration-200 ease-in-out cursor-pointer select-none
          ${collapsed ? "justify-center" : ""}
          ${
            active
              ? "bg-(--color-primary) text-black shadow-lg shadow-green-500/20"
              : "text-black hover:bg-(--color-primary-hover) hover:text-white"
          }
        `}
      >
        {/* Icon */}
        <div
          className={`
            flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg
            transition-all duration-200
            ${active ? "bg-white/20" : "bg-gray-800/50 group-hover:bg-white/10"}
          `}
        >
          <span className="text-lg leading-none">{item.icon}</span>
        </div>

        {/* Label + badge */}
        {!collapsed && (
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span className="text-sm font-medium truncate">{item.label}</span>

            {item.badge != null && (
              <span
                className={`
                  ml-2 px-2 py-0.5 text-xs font-bold rounded-full flex-shrink-0
                  ${active ? "bg-white/20 text-gray-400" : "bg-orange-500/20 text-orange-400"}
                `}
              >
                {item.badge}
              </span>
            )}

            {item.sub && (
              <svg
                className="w-4 h-4 ml-1 flex-shrink-0 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </div>
        )}

        {/* Tooltip (collapsed desktop only) */}
        {collapsed && !isMobile && (
          <div
            role="tooltip"
            className="
              absolute left-full ml-3 px-2.5 py-1.5 rounded-lg
              bg-gray-900 text-black text-xs whitespace-nowrap
              opacity-0 pointer-events-none group-hover:opacity-100
              transition-opacity duration-150 z-50 shadow-xl
              border border-gray-700
            "
          >
            {item.label}
            {item.badge != null && (
              <span className="ml-1 text-orange-400">({item.badge})</span>
            )}
          </div>
        )}
      </Link>

      {/* Sub-menu (expanded only) */}
      {item.sub && !collapsed && (
        <div className="ml-11 mt-1 space-y-0.5">
          {item.sub.map((subItem) => (
            <Link
              key={subItem}
              to={`${item.path}/${subItem.toLowerCase().replace(/\s+/g, "-")}`}
              className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              {subItem}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
