import React, { useRef, useState } from "react";
import cn from "../../../../helpers/cn";
import slugify from "../../../../helpers/slugify";
import Input from "../../../../components/Input"
import Select from "../../../../components/Select"
import Checkbox from "../../../../components/Checkbox"
import Badge from "../../../../components/Badge";
import Btn from "../../../../components/Btn";
import Modal from "../../../../components/Modal";
import Textarea from "../../../../components/Textarea";

export const CategoryForm = ({ categories, editData, onSave, onCancel, showToast }) => {
    const isEdit = !!editData;

    const [form, setForm] = useState({
        name: editData?.name ?? "",
        slug: editData?.slug ?? "",
        description: editData?.description ?? "",
        parent: editData?.parent ?? "",
        status: editData?.status ?? "active",
        icon: editData?.icon ?? "🗂️",
        metaTitle: editData?.metaTitle ?? "",
        metaDesc: editData?.metaDesc ?? "",
    });

    const [slugManual, setSlugManual] = useState(isEdit);
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [activeTab, setActiveTab] = useState("general");
    const fileInputRef = useRef(null);

    const ICONS = [
        "🗂️",
        "🥦",
        "🍎",
        "🥩",
        "🥛",
        "🥬",
        "🥕",
        "🍊",
        "🍞",
        "🐟",
        "🧀",
        "🥚",
        "🌽",
        "🧅",
        "🍇",
        "🫐",
        "🥑",
        "🧄",
    ];

    const set = (key, val) => {
        setForm((f) => {
            const nextState = { ...f, [key]: val };

            // If name is changing and slug is NOT manual, update slug too
            if (key === "name" && !slugManual) {
                nextState.slug = slugify(val);
            }

            return nextState;
        });

        if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Category name is required";
        if (!form.slug.trim()) e.slug = "Slug is required";
        // if (form.metaTitle.length > 60)
        //   e.metaTitle = "Meta title should be under 60 characters";
        // if (form.metaDesc.length > 160)
        //   e.metaDesc = "Meta description should be under 160 characters";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) {
            showToast("Please fix the errors.", "error");
            return;
        }

        const formData = new FormData();

        Object.keys(form).forEach((key) => {
            if (form[key] !== undefined && form[key] !== null) {
                formData.append(key, form[key]);
            }
        });

        if (selectedFile) {
            formData.append("image", selectedFile);
        }
        
        onSave(formData);
        showToast(isEdit ? "Category updated!" : "Category created!", "success");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (ev) => setImagePreview(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const parentOptions = categories.filter((c) => c._id !== editData?.id);
    const metaTitleLen = form.metaTitle.length;
    const metaDescLen = form.metaDesc.length;

    console.log(parentOptions);

    const TABS = [
        { id: "general", label: "General", icon: "📋" },
        { id: "image", label: "Image", icon: "🖼️" },
        // { id: "seo", label: "SEO", icon: "🔍" },
    ];

    return (
        <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
            <button
            onClick={onCancel}
            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            >
            ←
            </button>
            <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {isEdit ? "Edit Category" : "Add New Category"}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
                {isEdit
                ? `Editing: ${editData.name}`
                : "Fill in the details to create a new category"}
            </p>
            </div>
            <div className="ml-auto flex gap-3">
            <Btn variant="secondary" onClick={onCancel}>
                Discard
            </Btn>
            <Btn variant="primary" onClick={handleSubmit}>
                {isEdit ? "💾 Save Changes" : "✅ Create Category"}
            </Btn>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
            {/* Left — Main Form */}
            <div className="col-span-2 flex flex-col gap-5">
            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
                {TABS.map((t) => (
                <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all",
                    activeTab === t.id
                        ? "bg-white text-green-700 shadow-sm"
                        : "text-gray-500 hover:text-gray-700",
                    )}
                >
                    {t.icon} {t.label}
                </button>
                ))}
            </div>

            {/* ── GENERAL TAB ── */}
            {activeTab === "general" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
                <h3 className="font-bold text-gray-800 text-sm">
                    Basic Information
                </h3>

                {/* Name */}
                <Input
                    label="Category Name"
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="e.g. Vegetables"
                    error={errors.name}
                />

                {/* Slug */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Slug <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono select-none">
                        /categories/
                        </span>
                        <input
                        value={form.slug}
                        onChange={(e) => {
                            setSlugManual(true);
                            set("slug", e.target.value);
                        }}
                        placeholder="auto-generated-slug"
                        className={cn(
                            "w-full pl-[100px] pr-3.5 py-2.5 rounded-xl border text-sm text-gray-800 bg-white placeholder-gray-400 outline-none transition-all font-mono",
                            "border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100",
                            errors.slug && "border-red-400",
                        )}
                        />
                    </div>
                    <Btn
                        variant="secondary"
                        size="md"
                        onClick={() => {
                        setSlugManual(false);
                        set("slug", slugify(form.name));
                        }}
                        title="Regenerate from name"
                    >
                        🔄
                    </Btn>
                    </div>
                    {errors.slug && (
                    <p className="text-[11px] text-red-500">{errors.slug}</p>
                    )}
                    <p className="text-[11px] text-gray-400">
                    Auto-generated from name. Click 🔄 to reset.
                    </p>
                </div>

                {/* Description */}
                <Textarea
                    label="Description"
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Describe this category…"
                    rows={3}
                    hint="Optional. Shown on category pages."
                />

                {/* Parent + Status Row */}
                <div className="grid grid-cols-2 gap-4">
                    <Select
                    label="Parent Category"
                    value={form.parent ?? ""}
                    onChange={(e) =>
                        set("parent", e.target.value ? e.target.value : "")
                    }
                    >
                    <option value="">— None (Top Level) —</option>
                    {parentOptions.map((c) => (
                        <option key={c._id} value={c._id}>
                        {c.code} - {c.name}
                        </option>
                    ))}
                    </Select>

                    <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                    </label>
                    <div className="flex gap-2">
                        {["active", "inactive"].map((s) => (
                        <button
                            key={s}
                            // onClick={() => set("status", s)}
                            onChange={() =>
                                set("status", s)
                            }
                            className={cn(
                            "flex-1 py-2.5 rounded-xl border text-sm font-semibold capitalize transition-all",
                            form.status === s
                                ? s === "active"
                                ? "bg-green-600 text-white border-green-600 shadow-sm"
                                : "bg-gray-500 text-white border-gray-500"
                                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300",
                            )}
                        >
                            {s === "active" ? "✅" : "⏸️"}{" "}
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            )}

            {/* ── IMAGE TAB ── */}
            {activeTab === "image" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6">
                <h3 className="font-bold text-gray-800 text-sm">
                    Category Image / Icon
                </h3>

                {/* Icon Picker */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Choose Icon Emoji
                    </label>
                    <div className="flex flex-wrap gap-2">
                    {ICONS.map((ic) => (
                        <button
                        key={ic}
                        onClick={() => set("icon", ic)}
                        className={cn(
                            "w-11 h-11 rounded-xl text-xl transition-all border",
                            form.icon === ic
                            ? "bg-green-100 border-green-400 scale-110 shadow"
                            : "bg-gray-50 border-gray-200 hover:border-green-300 hover:bg-green-50",
                        )}
                        >
                        {ic}
                        </button>
                    ))}
                    </div>
                </div>

                {/* Image Upload */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Upload Category Image
                    </label>
                    <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-gray-200 hover:border-green-400 rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-all group"
                    >
                    {imagePreview ? (
                        <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-xl"
                        />
                    ) : (
                        <>
                        <div className="w-14 h-14 rounded-2xl bg-green-50 group-hover:bg-green-100 flex items-center justify-center text-2xl transition-colors">
                            📁
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-gray-700">
                            Click to upload
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                            PNG, JPG, WEBP up to 2MB
                            </p>
                        </div>
                        </>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    </div>
                    {imagePreview && (
                    <Btn
                        variant="secondary"
                        size="sm"
                        className="w-fit"
                        onClick={() => setImagePreview(null)}
                    >
                        ✕ Remove Image
                    </Btn>
                    )}
                </div>
                </div>
            )}

            {/* ── SEO TAB ── */}
            {activeTab === "seo" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
                <h3 className="font-bold text-gray-800 text-sm">SEO Settings</h3>

                {/* Meta Title */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Meta Title
                    </label>
                    <span
                        className={cn(
                        "text-[11px] font-mono",
                        metaTitleLen > 60 ? "text-red-500" : "text-gray-400",
                        )}
                    >
                        {metaTitleLen}/60
                    </span>
                    </div>
                    <input
                    value={form.metaTitle}
                    onChange={(e) => set("metaTitle", e.target.value)}
                    placeholder="SEO friendly page title…"
                    className={cn(
                        "w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-800 bg-white placeholder-gray-400 outline-none transition-all",
                        "border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100",
                        errors.metaTitle && "border-red-400",
                    )}
                    />
                    {errors.metaTitle && (
                    <p className="text-[11px] text-red-500">{errors.metaTitle}</p>
                    )}
                    <div className="w-full bg-gray-100 rounded-full h-1">
                    <div
                        className={cn(
                        "h-1 rounded-full transition-all",
                        metaTitleLen > 60
                            ? "bg-red-500"
                            : metaTitleLen > 45
                            ? "bg-yellow-500"
                            : "bg-green-500",
                        )}
                        style={{
                        width: `${Math.min(100, (metaTitleLen / 60) * 100)}%`,
                        }}
                    />
                    </div>
                </div>

                {/* Meta Description */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Meta Description
                    </label>
                    <span
                        className={cn(
                        "text-[11px] font-mono",
                        metaDescLen > 160 ? "text-red-500" : "text-gray-400",
                        )}
                    >
                        {metaDescLen}/160
                    </span>
                    </div>
                    <textarea
                    value={form.metaDesc}
                    onChange={(e) => set("metaDesc", e.target.value)}
                    placeholder="Brief description for search engines…"
                    rows={4}
                    className={cn(
                        "w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-800 bg-white placeholder-gray-400 outline-none transition-all resize-none",
                        "border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100",
                        errors.metaDesc && "border-red-400",
                    )}
                    />
                    {errors.metaDesc && (
                    <p className="text-[11px] text-red-500">{errors.metaDesc}</p>
                    )}
                    <div className="w-full bg-gray-100 rounded-full h-1">
                    <div
                        className={cn(
                        "h-1 rounded-full transition-all",
                        metaDescLen > 160
                            ? "bg-red-500"
                            : metaDescLen > 130
                            ? "bg-yellow-500"
                            : "bg-green-500",
                        )}
                        style={{
                        width: `${Math.min(100, (metaDescLen / 160) * 100)}%`,
                        }}
                    />
                    </div>
                </div>

                {/* Preview */}
                {(form.metaTitle || form.metaDesc) && (
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">
                        Search Preview
                    </p>
                    <p className="text-(--color-primary) text-sm font-medium hover:underline cursor-pointer truncate">
                        {form.metaTitle || form.name || "Page Title"}
                    </p>
                    <p className="text-green-700 text-xs mt-0.5">
                        yourstore.com/categories/{form.slug || "slug"}
                    </p>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                        {form.metaDesc ||
                        form.description ||
                        "No description provided."}
                    </p>
                    </div>
                )}
                </div>
            )}
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="flex flex-col gap-5">
            {/* Preview Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                Live Preview
                </h3>
                <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-20 h-20 rounded-2xl bg-green-50 border-2 border-green-100 flex items-center justify-center text-5xl shadow-inner">
                    {form.icon || "🗂️"}
                </div>
                <div className="text-center">
                    <p className="font-bold text-gray-900 text-lg leading-tight">
                    {form.name || "Category Name"}
                    </p>
                    {form.parent && (
                    <p className="text-xs text-gray-400 mt-1">
                        Under:{" "}
                        {categories.find((c) => c.id === Number(form.parent))?.name}
                    </p>
                    )}
                    <code className="text-xs text-gray-400 mt-1 block font-mono">
                    /{form.slug || "slug"}
                    </code>
                </div>
                <Badge status={form.status} />
                {form.description && (
                    <p className="text-xs text-gray-500 text-center line-clamp-2">
                    {form.description}
                    </p>
                )}
                </div>
            </div>

            {/* Quick Fields Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Quick Actions
                </h3>
                <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Status</span>
                    <button
                    onClick={() =>
                        set(
                        "status",
                        form.status === "active" ? "inactive" : "active",
                        )
                    }
                    className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold transition-all",
                        form.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600"
                        : "bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-700",
                    )}
                    >
                    {form.status === "active" ? "Active" : "Inactive"}
                    </button>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Icon</span>
                    <span className="text-xl">{form.icon}</span>
                </div>
                {isEdit && (
                    <>
                    <div className="h-px bg-gray-100" />
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">Products</span>
                        <span className="font-mono font-bold text-gray-800">
                        {editData.products}
                        </span>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">Created</span>
                        <span className="text-xs text-gray-400">
                        {editData.createdAt}
                        </span>
                    </div>
                    </>
                )}
                </div>
            </div>

            {/* Save Button (sticky) */}
            <Btn
                variant="primary"
                className="w-full justify-center py-3"
                onClick={handleSubmit}
            >
                {isEdit ? "💾 Save Changes" : "✅ Create Category"}
            </Btn>
            <Btn
                variant="secondary"
                className="w-full justify-center"
                onClick={onCancel}
            >
                Cancel
            </Btn>
            </div>
        </div>
        </div>
    );
}