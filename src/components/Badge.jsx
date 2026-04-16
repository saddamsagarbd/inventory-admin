import React from "react";
import cn from "../helpers/cn";

const Badge = ({ status }) => {
    return (
        <span
        className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide",
            status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-500",
        )}
        >
        <span
            className={cn(
            "w-1.5 h-1.5 rounded-full",
            status === "active" ? "bg-green-500" : "bg-gray-400",
            )}
        />
        {status === "active" ? "Active" : "Inactive"}
        </span>
    );
}

export default Badge;