/**
 * SidebarUser
 * Avatar + name shown at the bottom of the sidebar.
 * Collapses to just the avatar when sidebar is narrow.
 */
export default function SidebarUser({ collapsed }) {
  return (
    <div className="flex-shrink-0 p-3 border-t border-gray-700/50">
      <div
        className={`
          flex items-center gap-3 p-2 rounded-xl cursor-pointer
          transition-all duration-200 hover:bg-white/10
          ${collapsed ? "justify-center" : ""}
        `}
      >
        {/* Avatar with online indicator */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-(--color-primary) flex items-center justify-center text-sm font-bold text-white shadow-lg">
            AD
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full" />
        </div>

        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-gray-600 text-sm font-semibold truncate">
              Admin User
            </p>
            <p className="text-gray-400 text-xs truncate">Super Admin</p>
          </div>
        )}
      </div>
    </div>
  );
}
