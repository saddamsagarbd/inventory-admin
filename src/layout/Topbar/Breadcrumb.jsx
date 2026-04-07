import { BREADCRUMBS } from "../navConfig";

/**
 * Breadcrumb
 * Shows the current page path, e.g. Admin › Catalog › Product
 */
export default function Breadcrumb({ activeNav }) {
  const crumbs = BREADCRUMBS[activeNav] ?? ["Admin", "Dashboard"];

  return (
    <nav
      aria-label="breadcrumb"
      className="hidden sm:flex items-center gap-1.5 text-sm text-gray-400"
    >
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i < crumbs.length - 1 ? (
            <>
              <span className="hover:text-(--color-primary) cursor-pointer transition-colors">
                {crumb}
              </span>
              <span className="text-gray-300 text-xs select-none">›</span>
            </>
          ) : (
            <strong className="text-gray-800 font-semibold">{crumb}</strong>
          )}
        </span>
      ))}
    </nav>
  );
}
