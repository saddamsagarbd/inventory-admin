// Barrel export — import everything from one place:
// import { AdminWrapper, AdminLayout, Sidebar, Topbar, Footer } from "@/components/admin";

export { default as AdminWrapper } from "./AdminWrapper";
export { default as AdminLayout } from "./AdminLayout";
export { default as Sidebar } from "./Sidebar";
export { default as Topbar } from "./Topbar";
export { default as Footer } from "./Footer";

// Sub-components (sidebar)
export { default as MobileOverlay } from "./sidebar/MobileOverlay";
export { default as SidebarLogo } from "./sidebar/SidebarLogo";
export { default as NavSection } from "./sidebar/NavSection";
export { default as NavItem } from "./sidebar/NavItem";
export { default as SidebarUser } from "./sidebar/SidebarUser";

// Sub-components (topbar)
export { default as Breadcrumb } from "./topbar/Breadcrumb";
export { default as SearchBar } from "./topbar/SearchBar";
export { default as ActionButton } from "./topbar/ActionButton";
export { default as UserChip } from "./topbar/UserChip";

// Config
export { NAV, BREADCRUMBS } from "./navConfig";
