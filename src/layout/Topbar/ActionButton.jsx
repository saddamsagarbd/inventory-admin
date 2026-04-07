/**
 * ActionButton
 * Icon button used in the topbar action group.
 * Optional badge (notification dot).
 */
export default function ActionButton({ icon, badge, label = "" }) {
  return (
    <button
      aria-label={label}
      className="relative w-9 h-9 rounded-xl bg-gray-50 hover:bg-green-50 hover:text-green-700 text-gray-500 flex items-center justify-center transition-all text-base flex-shrink-0"
    >
      {icon}
      {badge && (
        <span
          aria-hidden
          className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"
        />
      )}
    </button>
  );
}
