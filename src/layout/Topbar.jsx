import Breadcrumb from "./Topbar/Breadcrumb";
import SearchBar from "./Topbar/SearchBar";
import ActionButton from "./Topbar/ActionButton";
import UserChip from "./Topbar/UserChip";

/**
 * Topbar
 *
 * Props:
 *  collapsed  — desktop sidebar collapsed state (for left offset)
 *  isMobile   — true when viewport < 768px
 *  onToggle   — () => void — hamburger click handler
 *  activeNav  — current nav id (for breadcrumbs)
 */
export default function Topbar({ collapsed, isMobile, onToggle, activeNav }) {
  // Sidebar width used to calculate left offset on desktop
  const leftOffset = isMobile ? 0 : collapsed ? 80 : 256;

  return (
    <header
      className="fixed top-0 right-0 z-40 h-16 bg-white border-b border-green-100 flex items-center gap-3 px-4 md:px-6 transition-all duration-300"
      style={{ left: `${leftOffset}px` }}
    >
      {/* Hamburger / drawer toggle */}
      <button
        onClick={onToggle}
        aria-label="Toggle sidebar"
        className="w-9 h-9 rounded-xl cursor-pointer bg-green-50 hover:bg-(--color-primary-hover) hover:text-white text-green-700 flex items-center justify-center transition-all duration-200 flex-shrink-0 text-base"
      >
        ☰
      </button>

      {/* Breadcrumb — hidden on xs */}
      <Breadcrumb activeNav={activeNav} />

      {/* Push actions to the right */}
      <div className="ml-auto flex items-center gap-2">
        <SearchBar />

        <ActionButton icon="🔔" badge label="Notifications" />
        <ActionButton icon="💬" label="Messages" />
        <ActionButton icon="🔄" label="Refresh" />

        <UserChip />
      </div>
    </header>
  );
}
