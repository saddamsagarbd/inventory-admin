import { useState, useEffect, useCallback } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MOBILE_BREAKPOINT = 768;

export default function AdminLayout({ activeNav, onNavChange }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Track actual viewport width
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      // Auto-close mobile drawer when resizing to desktop
      if (!mobile) setIsMobileOpen(false);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  }, [isMobile]);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  // Sidebar width for desktop layout offset
  const sidebarWidth = collapsed ? 80 : 256;

  return (
    <div className="min-h-screen bg-gray-50 flex font-[Sora,sans-serif]">
      <Sidebar
        collapsed={isMobile ? false : collapsed}
        isMobile={isMobile}
        isMobileOpen={isMobileOpen}
        onNavChange={onNavChange}
        onMobileClose={closeMobileSidebar}
      />

      {/* Main content area — offset by sidebar on desktop */}
      <div
        className="flex flex-col flex-1 min-h-screen transition-all duration-300 w-0"
        style={{ marginLeft: isMobile ? 0 : `${sidebarWidth}px` }}
      >
        <Topbar
          collapsed={collapsed}
          isMobile={isMobile}
          onToggle={toggleSidebar}
          activeNav={activeNav}
        />

        <main className="flex-1 mt-16 p-4 md:p-6 lg:p-7">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
