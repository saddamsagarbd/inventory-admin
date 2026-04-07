import NavItem from "../NavItem";

/**
 * NavSection
 * Groups NavItems under a labelled section header.
 */
export default function NavSection({
  section,
  items,
  collapsed,
  isActive,
  isMobile,
  onNavClick,
}) {
  return (
    <div className="mb-5">
      {!collapsed && (
        <p className="px-3 mb-2 text-[11px] uppercase tracking-wider font-semibold text-black">
          {section}
        </p>
      )}

      <div className="space-y-0.5">
        {items.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            collapsed={collapsed}
            isActive={isActive}
            isMobile={isMobile}
            onNavClick={onNavClick}
          />
        ))}
      </div>
    </div>
  );
}
