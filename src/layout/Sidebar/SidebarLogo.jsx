import { Link } from "react-router-dom";
import Logo from "../../assets/logo/52-bazaar-logo.webp";

/**
 * SidebarLogo
 * Renders the brand logo + name (expanded) or just logo (collapsed).
 * On mobile shows a close button instead of collapse logic.
 */
export default function SidebarLogo({ collapsed, isMobile, onMobileClose }) {
  return (
    <div className="flex items-center justify-between h-20 px-4 border-b border-gray-700/50 flex-shrink-0">
      {!collapsed ? (
        <>
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 group flex-1"
          >
            <img
              src={Logo}
              alt="52Bazaar"
              className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-(--color-primary) to-emerald-500 bg-clip-text text-transparent">
              52Bazaar
            </span>
          </Link>

          {isMobile && (
            <button
              onClick={onMobileClose}
              aria-label="Close sidebar"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </>
      ) : (
        <Link
          to="/admin/dashboard"
          className="flex items-center justify-center w-full group"
        >
          <img
            src={Logo}
            alt="52Bazaar"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
      )}
    </div>
  );
}
