import React, { useEffect, useRef } from "react";

const Checkbox = ({ checked, onChange, indeterminate }) => {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) ref.current.indeterminate = indeterminate;
    }, [indeterminate]);
    return (
        <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 text-green-600 accent-green-600 cursor-pointer"
        />
    );
}

export default Checkbox;