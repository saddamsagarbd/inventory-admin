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
import ProductTable from "./components/ProductTable";
import ProductGrid from "./components/ProductGrid";
import DeleteConfirmation from "./components/DeleteConfirmation";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    stockStatus: "",
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Mock data - replace with API call
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // Simulate API call
    const mockProducts = [
      {
        id: 1,
        name: "Wireless Headphones",
        sku: "WH-001",
        price: 99.99,
        salePrice: 79.99,
        stock: 45,
        status: "active",
        category: "Electronics",
        image: "https://via.placeholder.com/100",
        lowStockThreshold: 10,
      },
      {
        id: 2,
        name: "Smart Watch",
        sku: "SW-002",
        price: 199.99,
        salePrice: null,
        stock: 5,
        status: "active",
        category: "Electronics",
        image: "https://via.placeholder.com/100",
        lowStockThreshold: 10,
      },
      {
        id: 3,
        name: "Cotton T-Shirt",
        sku: "CT-003",
        price: 29.99,
        salePrice: 19.99,
        stock: 0,
        status: "inactive",
        category: "Clothing",
        image: "https://via.placeholder.com/100",
        lowStockThreshold: 20,
      },
    ];
    setProducts(mockProducts);
    setLoading(false);
  };

  const getStockStatus = (stock, threshold) => {
    if (stock <= 0)
      return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (stock <= threshold)
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { label: "In Stock", color: "bg-green-100 text-green-800" };
  };

  const handleDelete = async (id) => {
    // API call to delete
    setProducts(products.filter((p) => p.id !== id));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleBulkAction = async (action) => {
    if (action === "delete") {
      setProducts(products.filter((p) => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !filters.category || product.category === filters.category;
    const matchesStatus = !filters.status || product.status === filters.status;

    let matchesStockStatus = true;
    if (filters.stockStatus === "in")
      matchesStockStatus = product.stock > product.lowStockThreshold;
    if (filters.stockStatus === "low")
      matchesStockStatus =
        product.stock <= product.lowStockThreshold && product.stock > 0;
    if (filters.stockStatus === "out") matchesStockStatus = product.stock === 0;

    return (
      matchesSearch && matchesCategory && matchesStatus && matchesStockStatus
    );
  });

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <Link
          to="/admin/products/add"
          className="bg-(--color-primary) hover:bg-(--color-primary-hover) text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={filters.stockStatus}
            onChange={(e) =>
              setFilters({ ...filters, stockStatus: e.target.value })
            }
            className="px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Stock</option>
            <option value="in">In Stock</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
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
      {selectedProducts.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-3 mb-4 flex items-center justify-between">
          <span className="text-sm text-blue-700">
            {selectedProducts.length} products selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkAction("delete")}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Delete Selected
            </button>
            <button
              onClick={() => setSelectedProducts([])}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Products View */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : viewMode === "table" ? (
        <ProductTable
          products={filteredProducts}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          onDelete={(product) => {
            setProductToDelete(product);
            setShowDeleteModal(true);
          }}
          getStockStatus={getStockStatus}
        />
      ) : (
        <ProductGrid
          products={filteredProducts}
          onDelete={(product) => {
            setProductToDelete(product);
            setShowDeleteModal(true);
          }}
          getStockStatus={getStockStatus}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && productToDelete && (
        <DeleteConfirmation
          product={productToDelete}
          onConfirm={() => handleDelete(productToDelete.id)}
          onCancel={() => {
            setShowDeleteModal(false);
            setProductToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductList;
