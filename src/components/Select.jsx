import React from "react";
import cn from "../helpers/cn";
const Select = ({ label, required, children, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        className={cn(
          "w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-800 bg-white outline-none transition-all appearance-none cursor-pointer",
          "border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

export default Select;