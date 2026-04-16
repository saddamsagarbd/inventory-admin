import React from "react";
import cn from "../helpers/cn";

const Toast = ({ toasts }) => {
    return (
        <div className="fixed bottom-6 right-6 z-60 flex flex-col gap-2 pointer-events-none">
            {toasts.map((t) => (
                <div
                key={t.id}
                className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white pointer-events-auto",
                    t.type === "success"
                    ? "bg-green-700"
                    : t.type === "error"
                        ? "bg-red-600"
                        : "bg-gray-800",
                )}
                >
                    <span>
                        {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}
                    </span>
                    {t.message}
                </div>
            ))}
        </div>
    );
}

export default Toast;