import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { NAV } from "./navConfig";
import MobileOverlay from "./Sidebar/MobileOverlay";
import SidebarLogo from "./Sidebar/SidebarLogo";
import NavSection from "./Sidebar/NavSection";
import SidebarUser from "./Sidebar/SidebarUser";

/**
 * Sidebar
 *
 * Props:
 *  collapsed      — desktop collapsed state (icon-only rail)
 *  isMobile       — true when viewport < 768px
 *  isMobileOpen   — whether the mobile drawer is visible
 *  onNavChange    — (itemId: string) => void
 *  onMobileClose  — () => void
 */
export default function Sidebar({
  collapsed,
  isMobile,
  isMobileOpen,
  onNavChange,
  onMobileClose,
}) {
  const location = useLocation();

  // Close drawer on route change (mobile only)
  useEffect(() => {
    if (isMobile) onMobileClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Close drawer on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && isMobileOpen) onMobileClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isMobileOpen, onMobileClose]);

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname],
  );

  const handleNavClick = useCallback(
    (itemId, _path, _hasSub) => {
      onNavChange(itemId);
      if (isMobile) onMobileClose();
    },
    [isMobile, onNavChange, onMobileClose],
  );

  // ── Visibility logic ────────────────────────────────────────────────────
  // Mobile: slide in/out as a drawer
  // Desktop: always visible; width depends on `collapsed`
  const sidebarVisible = isMobile ? isMobileOpen : true;

  const positionClasses = isMobile
    ? `fixed top-0 left-0 h-full w-72 z-50 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`
    : `fixed top-0 left-0 h-screen z-50 ${collapsed ? "w-20" : "w-64"}`;

  return (
    <>
      {/* Mobile backdrop */}
      <MobileOverlay
        visible={isMobile && isMobileOpen}
        onClick={onMobileClose}
      />

      <aside
        className={`
          bg-white/10 backdrop-blur-lg text-gray-950
          flex flex-col shadow-2xl
          transition-all duration-300 ease-in-out
          ${positionClasses}
        `}
        aria-hidden={!sidebarVisible}
      >
        {/* Logo */}
        <SidebarLogo
          collapsed={collapsed}
          isMobile={isMobile}
          onMobileClose={onMobileClose}
        />

        {/* Scrollable nav */}
        <nav
          className="flex-1 overflow-y-auto scrollbar-hide py-4 px-3"
          style={{ scrollbarWidth: "none" }}
        >
          {NAV.map(({ section, items }) => (
            <NavSection
              key={section}
              section={section}
              items={items}
              collapsed={collapsed && !isMobile}
              isActive={isActive}
              isMobile={isMobile}
              onNavClick={handleNavClick}
            />
          ))}
        </nav>

        {/* User profile */}
        <SidebarUser collapsed={collapsed && !isMobile} />
      </aside>
    </>
  );
}
