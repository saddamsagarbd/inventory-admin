import React, { useState } from "react";
import cn from "../../../../helpers/cn";
import slugify from "../../../../helpers/slugify";
import Input from "../../../../components/Input"
import Select from "../../../../components/Select"
import Checkbox from "../../../../components/Checkbox"
import Badge from "../../../../components/Badge";
import Btn from "../../../../components/Btn";
import Modal from "../../../../components/Modal";
import Textarea from "../../../../components/Textarea";

export const UnitForm = ({ editData, onSave, onCancel, showToast }) => {
    const isEdit = !!editData;

    const [form, setForm] = useState({
        name: editData?.name ?? "",
        shortName: editData?.shortName ?? "",
        slug: editData?.slug ?? "",
    });

    const [slugManual, setSlugManual] = useState(isEdit);
    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState("general");

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
        if (!form.name.trim()) e.name = "unit name is required";
        if (!form.slug.trim()) e.slug = "Slug is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) {
            showToast("Please fix the errors.", "error");
            return;
        }

        console.log(form);

        // const formData = new FormData();

        // Object.keys(form).forEach((key) => {
        //     if (form[key] !== undefined && form[key] !== null) {
        //         formData.append(key, form[key]);
        //     }
        // });
        
        onSave(form);
        showToast(isEdit ? "unit updated!" : "unit created!", "success");
    };

    

    const TABS = [
        { id: "general", label: "General", icon: "📋" },
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
                {isEdit ? "Edit unit" : "Add New unit"}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
                {isEdit
                ? `Editing: ${editData.name}`
                : "Fill in the details to create a new unit"}
            </p>
            </div>
            <div className="ml-auto flex gap-3">
            <Btn variant="secondary" onClick={onCancel}>
                Discard
            </Btn>
            <Btn variant="primary" onClick={handleSubmit}>
                {isEdit ? "💾 Save Changes" : "✅ Create unit"}
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
                    label="Unit Name"
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="e.g. Kilogram"
                    error={errors.name}
                />
                {/* Short Name */}
                <Input
                    label="Short Name"
                    required
                    value={form.shortName}
                    onChange={(e) => set("shortName", e.target.value)}
                    placeholder="e.g. KG"
                    error={errors.shortName}
                />

                {/* Slug */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Slug <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono select-none">
                        /units/
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
                </div>
            )}

            {/* ── RIGHT SIDEBAR ── */}
                <div className="flex gap-5">

                    {/* Save Button (sticky) */}
                    
                    <Btn
                        variant="secondary"
                        className="w-50 justify-center"
                        onClick={onCancel}
                    >
                        Cancel
                    </Btn>
                    <Btn
                        variant="primary"
                        className="w-50 justify-center py-3"
                        onClick={handleSubmit}
                    >
                        {isEdit ? "💾 Save Changes" : "✅ Create unit"}
                    </Btn>
                </div>
            </div>

        </div>
        </div>
    );
}