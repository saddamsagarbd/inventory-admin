import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, X } from "lucide-react";
import SupplierForm from "./components/SupplierForm";
import api from '../../../config/axiosConfig';

const AddEditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = id ? await api.put(`/supplier/${id}`, formData) : await api.post('/supplier/create', formData);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
      if(result.data.success){
        navigate("/admin/Suppliers");
      }else{
        console.log(result.data.message);
      }
      
    } catch (error) {
      setLoading(false);
      console.log(`Supplier create error: ${error.message}`);
    }
  };

  const tabs = [
    { id: "basic", label: "Supplier Info", icon: "📝" },
  ];

  useEffect(() => {
    if (id) {

      const fetchSupplier = async () => {
        setLoading(true);
        // API call
        const result = await api.get(`/Supplier/${id}`);
        // console.log(result.data.data);
        setFormData(result.data.data);
        setLoading(false);
      };
      
      fetchSupplier();
    }
  }, [id]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {id ? "Edit Supplier" : "Add New Supplier"}
            </h1>
            <p className="text-gray-600 mt-1">
              {id
                ? "Update Supplier information"
                : "Create a new Supplier in your catalog"}
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/Suppliers")}
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
          <SupplierForm
            activeTab={activeTab}
            formData={formData}
            setFormData={setFormData}
          />

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-sm p-4 sticky bottom-0 mt-6">
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => navigate("/admin/Suppliers")}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-(--color-primary) text-white rounded-lg hover:bg-(--color-primary-hover) transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Supplier"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditSupplier;
