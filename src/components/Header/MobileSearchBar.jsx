const MobileSearchBar = () => {
  return (
    <div className="sm:hidden bg-(--color-primary) px-3 pb-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for products (e.g. shirt, pant)"
          className="w-full pl-4 pr-12 py-2.5 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-emerald-300 text-sm"
        />
        <button className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-(--color-primary)">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
export default MobileSearchBar;
