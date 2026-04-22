import { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import { CategoryList } from "./categories/components/CategoryList";
import { CategoryForm } from "./categories/components/CategoryForm";
import api from "../../config/axiosConfig";

/* ─── MOCK DATA ───────────────────────────────── */
const INITIAL_CATEGORIES = [
  {
    id: 1,
    name: "Vegetables",
    slug: "vegetables",
    status: "active",
    products: 142,
    parent: null,
    icon: "🥦",
    description: "Fresh organic vegetables",
    metaTitle: "Buy Fresh Vegetables Online",
    metaDesc: "Shop the best organic vegetables.",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Fruits",
    slug: "fruits",
    status: "active",
    products: 98,
    parent: null,
    icon: "🍎",
    description: "Seasonal and exotic fruits",
    metaTitle: "Fresh Fruits Online",
    metaDesc: "Order fresh fruits delivered.",
    createdAt: "2024-01-18",
  },
  {
    id: 3,
    name: "Meat & Fish",
    slug: "meat-fish",
    status: "active",
    products: 64,
    parent: null,
    icon: "🥩",
    description: "Premium meat and seafood",
    metaTitle: "Fresh Meat & Fish Delivery",
    metaDesc: "Premium quality meat online.",
    createdAt: "2024-02-01",
  },
  {
    id: 4,
    name: "Dairy",
    slug: "dairy",
    status: "active",
    products: 47,
    parent: null,
    icon: "🥛",
    description: "Fresh dairy products",
    metaTitle: "Dairy Products Online",
    metaDesc: "Fresh milk, cheese & more.",
    createdAt: "2024-02-10",
  },
  {
    id: 5,
    name: "Leafy Greens",
    slug: "leafy-greens",
    status: "active",
    products: 38,
    parent: 1,
    icon: "🥬",
    description: "Spinach, lettuce, kale",
    metaTitle: "Fresh Leafy Greens",
    metaDesc: "Order leafy greens online.",
    createdAt: "2024-02-20",
  },
  {
    id: 6,
    name: "Root Veggies",
    slug: "root-veggies",
    status: "inactive",
    products: 22,
    parent: 1,
    icon: "🥕",
    description: "Carrots, beetroot, radish",
    metaTitle: "Root Vegetables Online",
    metaDesc: "Buy root vegetables fresh.",
    createdAt: "2024-03-01",
  },
  {
    id: 7,
    name: "Citrus Fruits",
    slug: "citrus-fruits",
    status: "active",
    products: 18,
    parent: 2,
    icon: "🍊",
    description: "Oranges, lemons, limes",
    metaTitle: "Fresh Citrus Fruits",
    metaDesc: "Vitamin C rich citrus fruits.",
    createdAt: "2024-03-05",
  },
  {
    id: 8,
    name: "Bakery",
    slug: "bakery",
    status: "inactive",
    products: 0,
    parent_category: null,
    icon: "🍞",
    description: "Breads, cakes and pastries",
    metaTitle: "Fresh Bakery Products",
    metaDesc: "Freshly baked goods daily.",
    createdAt: "2024-03-10",
  },
];

/* ─── ROOT APP ────────────────────────────────── */
export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [view, setView] = useState("list"); // "list" | "add" | "edit"
  const [editData, setEditData] = useState(null);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  const handleAdd = () => {
    setEditData(null);
    setView("add");
  };
  const handleEdit = (cat) => {
    setEditData(cat);
    setView("edit");
  };
  const handleCancel = () => {
    setView("list");
    setEditData(null);
  };

  const handleSave = async (formData) => {

    if (editData) {
      const result = await api.put(`/category/${editData.id}`, formData);
      setCategories((cats) => cats.map((cat) => 
        {
          if(!result.data.category) return cat;
          console.log(cat.id === result.data.category.id);
          return cat.id === result.data.category.id ? result.data.category : cat
        }
      ));
    } else {
      const result = await api.post('/category/create', formData);
      setCategories((cats) => [...cats, result.data.category]);
    }
    setView("list");
  };

  const handleDelete = (ids) => {
    setCategories((cats) => cats.filter((c) => !ids.includes(c.id)));
  };

  useEffect(()=>{

    const loadCategories = async () => {
      try {
        const result = await api.get('/category');
        if(result.data.categories) setCategories(result.data.categories);
      } catch (error) {
        console.log(error.message)
      }

    }

    loadCategories();

  }, []);

  return (
    <div
      className="min-h-screen bg-gray-50 p-6"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">
        {view === "list" && (
          <CategoryList
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
            showToast={showToast}
          />
        )}
        {(view === "add" || view === "edit") && (
          <CategoryForm
            categories={categories}
            editData={editData}
            onSave={handleSave}
            onCancel={handleCancel}
            showToast={showToast}
          />
        )}
      </div>
      <Toast toasts={toasts} />
    </div>
  );
}
