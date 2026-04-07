// pages/Inventory.jsx
import React, { useState, useEffect } from "react";
import InventoryTable from "./components/InventoryTable";
import ExportButton from "./components/ExportButton";
import { useInventory } from "../../../hooks/useInventory";
import StockAdjustmentModal from "./components/StockAdjustmentModal";
import { Loading } from "../../../common/Loading";

const Inventory = () => {
  const { products, loading, updateStock, fetchProducts } = useInventory();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStockUpdate = (productId, newStock) => {
    updateStock(productId, newStock);
  };

  const handleAdjustStock = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleStockAdjustment = (productId, quantity, reason) => {
    updateStock(productId, quantity, reason);
    handleModalClose();
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "low" &&
        product.currentStock <= product.lowStockThreshold) ||
      (filterStatus === "out" && product.currentStock === 0);
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return Loading;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Inventory Management
        </h1>
        <p className="text-gray-600 mt-1">Manage your product stock levels</p>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Products</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
        <ExportButton products={filteredProducts} />
      </div>

      {/* Inventory Table */}
      <InventoryTable
        products={filteredProducts}
        onStockUpdate={handleStockUpdate}
        onAdjustStock={handleAdjustStock}
      />

      {/* Stock Adjustment Modal */}
      {showModal && selectedProduct && (
        <StockAdjustmentModal
          product={selectedProduct}
          onClose={handleModalClose}
          onAdjust={handleStockAdjustment}
        />
      )}
    </div>
  );
};

export default Inventory;
