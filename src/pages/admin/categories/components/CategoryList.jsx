import React, { useState } from "react";
import cn from "../../../../helpers/cn";
import Badge from "../../../../components/Badge";
import Btn from "../../../../components/Btn";
import Checkbox from "../../../../components/Checkbox";
import Modal from "../../../../components/Modal";
import SortIcon from "../../../../components/SortIcon";

export const CategoryList = ({ categories, onEdit, onDelete, onAdd, showToast }) => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [sortDir, setSortDir] = useState("asc");
    const [selected, setSelected] = useState([]);
    const [deleteModal, setDeleteModal] = useState(null); // null | "single" | "bulk"
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [page, setPage] = useState(1);
    const PER_PAGE = 6;

    const filtered = categories
        .filter((c) => {
            if(!c) return false;
            const matchSearch =
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.slug.toLowerCase().includes(search.toLowerCase());
            const matchStatus = statusFilter === "all" || c.status === statusFilter;
            return matchSearch && matchStatus;
        })
        .sort((a, b) => {
            let va = sortBy === "name" ? a.name : a.createdAt;
            let vb = sortBy === "name" ? b.name : b.createdAt;
            return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
        });

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const allChecked =
        paginated.length > 0 && paginated.every((c) => selected.includes(c.id));
    const someChecked =
        paginated.some((c) => selected.includes(c.id)) && !allChecked;

    const toggleAll = () => {
        if (allChecked)
        setSelected((s) => s.filter((id) => !paginated.find((c) => c.id === id)));
        else
        setSelected((s) => [...new Set([...s, ...paginated.map((c) => c.id)])]);
    };

    const toggleOne = (id) =>
        setSelected((s) =>
        s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
        );

    const handleSort = (col) => {
        if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        else {
        setSortBy(col);
        setSortDir("asc");
        }
    };

    const getParentName = (parentId) => {
        if (!parentId) return "—";
        const p = categories.find((c) => c.id === parentId);
        return p ? p.name : "—";
    };

    const confirmDelete = () => {
        if (deleteModal === "single") {
        onDelete([deleteTarget]);
        showToast("Category deleted successfully.", "success");
        } else {
        onDelete(selected);
        showToast(`${selected.length} categories deleted.`, "success");
        setSelected([]);
        }
        setDeleteModal(null);
        setDeleteTarget(null);
    };

    const activeCount = categories.filter((c) => {
        if(!c) return false;
        return c.status === "active"
    }).length;
    const inactiveCount = categories.filter(
        (c) => {
            if(!c) return false;
            return c.status === "inactive"
        },
    ).length;

    return (
        <div>
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
            <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Category Management
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
                Manage your product categories and subcategories
            </p>
            </div>
            <Btn onClick={onAdd} size="md">
            <span>＋</span> Add Category
            </Btn>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
            {[
            {
                label: "Total Categories",
                value: categories.length,
                icon: "🗂️",
                bg: "bg-green-50",
                color: "text-green-700",
            },
            {
                label: "Active",
                value: activeCount,
                icon: "✅",
                bg: "bg-emerald-50",
                color: "text-emerald-700",
            },
            {
                label: "Inactive",
                value: inactiveCount,
                icon: "⏸️",
                bg: "bg-gray-50",
                color: "text-gray-500",
            },
            ].map((s) => (
            <div
                key={s.label}
                className={cn(
                "rounded-2xl border border-gray-100 p-4 flex items-center gap-4 shadow-sm",
                s.bg,
                )}
            >
                <div className="text-2xl">{s.icon}</div>
                <div>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                <p
                    className={cn(
                    "text-2xl font-bold font-mono tracking-tight",
                    s.color,
                    )}
                >
                    {s.value}
                </p>
                </div>
            </div>
            ))}
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4">
            <div className="flex items-center gap-3 px-5 py-4 flex-wrap">
            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 rounded-xl px-3 py-2 w-64 transition-all">
                <span className="text-gray-400 text-sm">🔍</span>
                <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
                placeholder="Search categories…"
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                />
                {search && (
                <button
                    onClick={() => setSearch("")}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                >
                    ✕
                </button>
                )}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                {["all", "active", "inactive"].map((s) => (
                <button
                    key={s}
                    onClick={() => {
                    setStatusFilter(s);
                    setPage(1);
                    }}
                    className={cn(
                    "px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all",
                    statusFilter === s
                        ? "bg-white text-green-700 shadow-sm"
                        : "text-gray-500 hover:text-gray-700",
                    )}
                >
                    {s === "all" ? "All Status" : s}
                </button>
                ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-gray-400 font-medium">Sort by:</span>
                <button
                onClick={() => handleSort("name")}
                className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                    sortBy === "name"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300",
                )}
                >
                Name <SortIcon col="name" />
                </button>
                <button
                onClick={() => handleSort("createdAt")}
                className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                    sortBy === "createdAt"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300",
                )}
                >
                Date <SortIcon col="createdAt" />
                </button>
            </div>

            {/* Bulk delete */}
            {selected.length > 0 && (
                <Btn
                variant="danger"
                size="sm"
                onClick={() => setDeleteModal("bulk")}
                >
                🗑 Delete ({selected.length})
                </Btn>
            )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                <tr className="bg-gray-50 border-t border-gray-100">
                    <th className="px-5 py-3 w-10">
                    <Checkbox
                        checked={allChecked}
                        indeterminate={someChecked}
                        onChange={toggleAll}
                    />
                    </th>
                    <th className="px-5 py-3 text-left text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                    Category
                    </th>
                    <th className="px-5 py-3 text-left text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                    Slug
                    </th>
                    <th className="px-5 py-3 text-left text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                    Parent
                    </th>
                    <th className="px-5 py-3 text-left text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                    Status
                    </th>
                    <th className="px-5 py-3 text-left text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                    Products
                    </th>
                    <th className="px-5 py-3 text-left text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                    Created
                    </th>
                    <th className="px-5 py-3 text-left text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                    Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {paginated.length === 0 ? (
                    <tr>
                    <td colSpan={8} className="text-center py-16 text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl">🔍</span>
                        <p className="font-medium">No categories found</p>
                        <p className="text-sm">
                            Try adjusting your search or filter
                        </p>
                        </div>
                    </td>
                    </tr>
                ) : (
                    paginated.map((cat) => (
                    <tr
                        key={cat.id}
                        className={cn(
                        "border-t border-gray-100 transition-colors",
                        selected.includes(cat.id)
                            ? "bg-green-50/60"
                            : "hover:bg-gray-50/60",
                        )}
                    >
                        <td className="px-5 py-4">
                        <Checkbox
                            checked={selected.includes(cat.id)}
                            onChange={() => toggleOne(cat.id)}
                        />
                        </td>
                        <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-xl flex-shrink-0 border border-green-100">
                                <img
                                src={cat.image}
                                alt="Preview"
                                className="w-6 h-6 object-cover rounded-xl"
                                />
                            </div>
                            <div>
                            <p className="text-sm font-semibold text-gray-800">
                                {cat.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-[180px]">
                                {cat.description}
                            </p>
                            </div>
                        </div>
                        </td>
                        <td className="px-5 py-4">
                        <code className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-mono">
                            {cat.slug}
                        </code>
                        </td>
                        <td className="px-5 py-4">
                        <span className="text-sm text-gray-500">
                            {getParentName(cat.parent)}
                        </span>
                        </td>
                        <td className="px-5 py-4">
                        <Badge status={cat.status} />
                        </td>
                        <td className="px-5 py-4">
                        <span className="font-mono text-sm font-bold text-gray-800">
                            {cat.products}
                        </span>
                        </td>
                        <td className="px-5 py-4">
                        <span className="text-xs text-gray-400">
                            {cat.createdAt}
                        </span>
                        </td>
                        <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                            <Btn
                            variant="secondary"
                            size="sm"
                            onClick={() => onEdit(cat)}
                            >
                            ✏️ Edit
                            </Btn>
                            <Btn
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => {
                                setDeleteModal("single");
                                setDeleteTarget(cat.id);
                            }}
                            >
                            🗑
                            </Btn>
                        </div>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                Showing {(page - 1) * PER_PAGE + 1}–
                {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}{" "}
                results
                </p>
                <div className="flex items-center gap-1.5">
                <Btn
                    variant="secondary"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    ← Prev
                </Btn>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                        "w-8 h-8 rounded-lg text-xs font-semibold transition-all",
                        page === p
                        ? "bg-green-700 text-white"
                        : "bg-white border border-gray-200 text-gray-500 hover:border-green-300",
                    )}
                    >
                    {p}
                    </button>
                ))}
                <Btn
                    variant="secondary"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                >
                    Next →
                </Btn>
                </div>
            </div>
            )}
        </div>

        {/* Delete Modal */}
        <Modal
            open={!!deleteModal}
            onClose={() => setDeleteModal(null)}
            title="Confirm Delete"
        >
            <div className="flex flex-col gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-3xl mx-auto">
                🗑️
            </div>
            <p className="text-center text-gray-700 text-sm leading-relaxed">
                {deleteModal === "bulk"
                ? `Are you sure you want to delete ${selected.length} selected categories? This action cannot be undone.`
                : "Are you sure you want to delete this category? This action cannot be undone."}
            </p>
            <div className="flex gap-3">
                <Btn
                variant="secondary"
                className="flex-1 justify-center"
                onClick={() => setDeleteModal(null)}
                >
                Cancel
                </Btn>
                <Btn
                variant="danger"
                className="flex-1 justify-center"
                onClick={confirmDelete}
                >
                Yes, Delete
                </Btn>
            </div>
            </div>
        </Modal>
        </div>
    );
}