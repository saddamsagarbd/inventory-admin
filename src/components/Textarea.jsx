import React from "react";
import cn from "../helpers/cn";

const Textarea = ({ label, required, error, hint, className, ...props }) => {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <textarea
                className={cn(
                "w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-800 bg-white placeholder-gray-400 outline-none transition-all resize-none",
                "border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100",
                error && "border-red-400",
                className,
                )}
                {...props}
            />
            {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
            {error && <p className="text-[11px] text-red-500">{error}</p>}
        </div>
    );
}

export default Textarea;