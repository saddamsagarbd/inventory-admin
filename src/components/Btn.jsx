import React from "react";
import cn from "../helpers/cn";

const Btn = ({
    variant = "primary",
    size = "md",
    children,
    className,
    ...props
}) => {
    const base =
        "inline-flex items-center gap-2 font-semibold rounded-xl transition-all duration-150 cursor-pointer border";
    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-sm",
    };
    const variants = {
        primary:
        "bg-(--color-primary) text-white border-(--color-primary) hover:bg-(--color-primary-hover) hover:border-(--color-primary-hover) shadow-sm shadow-green-900/20",
        secondary:
        "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50",
        danger:
        "bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700",
        ghost:
        "bg-transparent text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-700",
        warning: "bg-orange-500 text-white border-orange-500 hover:bg-orange-600",
    };
    return (
        <button
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
        >
        {children}
        </button>
    );
}

export default Btn;