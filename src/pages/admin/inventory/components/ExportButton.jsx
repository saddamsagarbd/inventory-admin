// components/inventory/ExportButton.jsx
import React from "react";
import * as XLSX from "xlsx";

const ExportButton = ({ products }) => {
  const exportToCSV = () => {
    const exportData = products.map((product) => ({
      "Product Name": product.name,
      SKU: product.sku,
      "Current Stock": product.currentStock,
      "Low Stock Threshold": product.lowStockThreshold,
      Status: getStatusText(product.currentStock, product.lowStockThreshold),
      "Last Updated": new Date().toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory Report");

    // Auto-size columns
    const colWidths = [
      { wch: 30 }, // Product Name
      { wch: 15 }, // SKU
      { wch: 12 }, // Current Stock
      { wch: 15 }, // Threshold
      { wch: 12 }, // Status
      { wch: 15 }, // Last Updated
    ];
    ws["!cols"] = colWidths;

    XLSX.writeFile(
      wb,
      `inventory_report_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  const getStatusText = (currentStock, threshold) => {
    if (currentStock === 0) return "Out of Stock";
    if (currentStock <= threshold) return "Low Stock";
    return "In Stock";
  };

  return (
    <button
      onClick={exportToCSV}
      className="flex items-center gap-2 px-4 py-2 bg-(--color-primary) cursor-pointer text-white rounded-lg hover:bg-(--color-primary-hover) transition-colors"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      Export Report
    </button>
  );
};

export default ExportButton;
