import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, X } from "lucide-react";
import StoreForm from "./components/StoreForm";

const AddEditStore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
    email: "",
    manager: "",
    isMainWarehouse: true,
    notes: "",
  });

  useEffect(() => {
    if (id) {
      fetchStore();
    }
  }, [id]);

  const fetchStore = async () => {
    setLoading(true);
    // API call

    const stores = [];
    setFormData(stores);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // API call to save
    console.log("Saving Store:", formData);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    // navigate("/admin/Stores");
  };

  const tabs = [
    { id: "basic", label: "Store Info", icon: "📝" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {id ? "Edit Store" : "Add New Store"}
            </h1>
            <p className="text-gray-600 mt-1">
              {id
                ? "Update Store information"
                : "Create a new Store in your catalog"}
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/Stores")}
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
          <StoreForm
            activeTab={activeTab}
            formData={formData}
            setFormData={setFormData}
          />

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-sm p-4 sticky bottom-0 mt-6">
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => navigate("/admin/Stores")}
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
                {loading ? "Saving..." : "Save Store"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditStore;
