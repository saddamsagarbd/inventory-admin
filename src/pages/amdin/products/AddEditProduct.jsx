import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, X } from "lucide-react";
import ProductForm from "./components/ProductForm";

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    description: "",
    regularPrice: "",
    salePrice: "",
    cost: "",
    stockQuantity: "",
    lowStockThreshold: "",
    images: [],
    featuredImage: null,
    slug: "",
    metaTitle: "",
    metaDescription: "",
    weight: "",
    dimensions: "",
    tags: [],
  });

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    // Mock API call
    const mockProduct = {
      name: "Wireless Headphones",
      sku: "WH-001",
      category: "Electronics",
      description: "High-quality wireless headphones",
      regularPrice: 99.99,
      salePrice: 79.99,
      cost: 45.0,
      stockQuantity: 45,
      lowStockThreshold: 10,
      images: ["https://via.placeholder.com/400"],
      featuredImage: "https://via.placeholder.com/400",
      slug: "wireless-headphones",
      metaTitle: "Best Wireless Headphones",
      metaDescription: "Shop our premium wireless headphones",
      weight: "0.5",
      dimensions: "20x15x5",
      tags: ["headphones", "wireless", "audio"],
    };
    setFormData(mockProduct);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // API call to save
    console.log("Saving product:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    navigate("/admin/products");
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: "📝" },
    { id: "pricing", label: "Pricing", icon: "💰" },
    { id: "inventory", label: "Inventory", icon: "📦" },
    { id: "images", label: "Images", icon: "🖼️" },
    { id: "seo", label: "SEO", icon: "🔍" },
    { id: "additional", label: "Additional", icon: "⚙️" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {id ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="text-gray-600 mt-1">
              {id
                ? "Update product information"
                : "Create a new product in your catalog"}
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/products")}
            className="text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex gap-1 px-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-(--color-primary) border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <ProductForm
            activeTab={activeTab}
            formData={formData}
            setFormData={setFormData}
          />

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-sm p-4 sticky bottom-0 mt-6">
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-(--color-primary) text-white rounded-lg hover:bg-(--color-primary-hover) transition disabled:opacity-50 flex items-center gap-2"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;
