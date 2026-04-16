import React from "react";

const SortIcon = ({ col, sortDir="asc", sortBy }) => (
    <span className="ml-1 opacity-40 text-[10px]">
    {sortBy === col ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
    </span>
);

export default SortIcon;