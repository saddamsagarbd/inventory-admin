export default function UserChip() {
  return (
    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 hover:border-(--color-primary) hover:bg-(--color-primary-hover) rounded-xl cursor-pointer transition-all ml-1">
      <div className="w-7 h-7 rounded-full bg-(--color-primary) flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
        AD
      </div>
      <span className="text-sm font-semibold text-gray-800 hidden sm:inline">
        Admin
      </span>
      <span className="text-[10px] text-gray-400 hidden sm:inline">▾</span>
    </button>
  );
}
