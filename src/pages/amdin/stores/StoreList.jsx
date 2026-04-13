import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Grid3x3,
  Table2,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import StoreTable from "./components/StoreTable";
import StoreGrid from "./components/StoreGrid";
import DeleteConfirmation from "./components/DeleteConfirmation";
import api from '../../../config/axiosConfig';
import MySwal from '../../../utils/swal';

const StoreList = () => {
  const [Stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    stockStatus: "",
  });
  const [selectedStores, setSelectedStores] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [StoreToDelete, setStoreToDelete] = useState(null);

  // Mock data - replace with API call
  useEffect(() => {
    const fetchStores = async () => {
      // Simulate API call
      try {
        const result = await api.get('/store');
        setLoading(false);
        if(result.data.success){
          setStores(result.data.data);
          setStoreToDelete(result.data.data);
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchStores();
  }, []);

  const getStockStatus = (stock, threshold) => {
    if (stock <= 0)
      return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (stock <= threshold)
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { label: "In Stock", color: "bg-green-100 text-green-800" };
  };

  const handleDelete = async (id) => {

    console

    if(!id){
      MySwal.fire({
        title: 'Error!',
        text: 'ID not found',
        icon: 'error'
      });
    }else{

      const result = await MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        try {
          // API call to delete
          await api.delete(`/store/${id}`);

          MySwal.fire({
            title: 'Deleted!',
            text: 'Store has been deleted.',
            icon: 'success'
          });

          const result = await api.get('/store');
          setStores(result.data.data);
        } catch (error) {
          MySwal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error'
          });
        }

      }

    }
  };

  const handleBulkAction = async (action) => {
    if (action === "delete") {
      setStores(Stores.filter((s) => !selectedStores.includes(s.id)));
      setSelectedStores([]);
    }
  };

  const filteredStores = Stores.filter((Store) => {
    const matchesSearch =
      Store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Store.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !filters.category || Store.category === filters.category;
    const matchesStatus = !filters.status || Store.status === filters.status;

    let matchesStockStatus = true;
    if (filters.stockStatus === "in")
      matchesStockStatus = Store.stock > Store.lowStockThreshold;
    if (filters.stockStatus === "low")
      matchesStockStatus =
        Store.stock <= Store.lowStockThreshold && Store.stock > 0;
    if (filters.stockStatus === "out") matchesStockStatus = Store.stock === 0;

    return (
      matchesSearch && matchesCategory && matchesStatus && matchesStockStatus
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stores</h1>
          <p className="text-gray-600 mt-1">Manage your Store</p>
        </div>
        <Link
          to="/admin/stores/add"
          className="bg-(--color-primary) hover:bg-(--color-primary-hover) text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus size={20} />
          Add Store
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-50">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            onClick={() =>
              setFilters({ category: "", status: "", stockStatus: "" })
            }
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Clear Filters
          </button>

          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded ${viewMode === "table" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
            >
              <Table2 size={20} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
            >
              <Grid3x3 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedStores.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-3 mb-4 flex items-center justify-between">
          <span className="text-sm text-blue-700">
            {selectedStores.length} Stores selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkAction("delete")}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Delete Selected
            </button>
            <button
              onClick={() => setSelectedStores([])}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Stores View */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : viewMode === "table" ? (
        <StoreTable
          Stores={filteredStores}
          selectedStores={selectedStores}
          setSelectedStores={setSelectedStores}
          onDelete={(Store) => {
            setStoreToDelete(Store);
            setShowDeleteModal(true);
          }}
          getStockStatus={getStockStatus}
        />
      ) : (
        <StoreGrid
          Stores={filteredStores}
          onDelete={(Store) => {
            setStoreToDelete(Store);
            setShowDeleteModal(true);
          }}
          getStockStatus={getStockStatus}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && StoreToDelete && (
        <DeleteConfirmation
          Store={StoreToDelete}
          onConfirm={() => handleDelete(StoreToDelete.id)}
          onCancel={() => {
            setShowDeleteModal(false);
            setStoreToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default StoreList;
