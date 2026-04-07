/**
 * MobileOverlay
 * Dark backdrop shown behind the sidebar drawer on mobile.
 * Clicking it closes the drawer.
 */
export default function MobileOverlay({ visible, onClick }) {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-40 md:hidden"
      onClick={onClick}
      aria-hidden="true"
    />
  );
}
