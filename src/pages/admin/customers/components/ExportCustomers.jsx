// components/customers/ExportCustomers.jsx
import React from "react";
import * as XLSX from "xlsx";

const ExportCustomers = ({ customers }) => {
  const exportToExcel = () => {
    const exportData = customers.map((customer) => ({
      Name: customer.name,
      Email: customer.email,
      Phone: customer.phone || "",
      "Total Orders": customer.totalOrders || 0,
      "Total Spent": customer.totalSpent || 0,
      "Average Order Value": customer.totalOrders
        ? (customer.totalSpent / customer.totalOrders).toFixed(2)
        : 0,
      "Last Order Date": customer.lastOrderDate
        ? new Date(customer.lastOrderDate).toLocaleDateString()
        : "N/A",
      "Joined Date": customer.joinedDate
        ? new Date(customer.joinedDate).toLocaleDateString()
        : "N/A",
      Status: customer.status,
      Addresses: customer.addresses ? customer.addresses.length : 0,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Customers");

    // Auto-size columns
    const colWidths = [
      { wch: 25 }, // Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 12 }, // Total Orders
      { wch: 15 }, // Total Spent
      { wch: 15 }, // Average Order Value
      { wch: 15 }, // Last Order Date
      { wch: 15 }, // Joined Date
      { wch: 10 }, // Status
      { wch: 10 }, // Addresses
    ];
    ws["!cols"] = colWidths;

    XLSX.writeFile(
      wb,
      `customers_export_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Total Orders",
      "Total Spent",
      "Average Order Value",
      "Last Order Date",
      "Joined Date",
      "Status",
    ];
    const csvData = customers.map((customer) => [
      customer.name,
      customer.email,
      customer.phone || "",
      customer.totalOrders || 0,
      customer.totalSpent || 0,
      customer.totalOrders
        ? (customer.totalSpent / customer.totalOrders).toFixed(2)
        : 0,
      customer.lastOrderDate
        ? new Date(customer.lastOrderDate).toLocaleDateString()
        : "N/A",
      customer.joinedDate
        ? new Date(customer.joinedDate).toLocaleDateString()
        : "N/A",
      customer.status,
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `customers_export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative group">
      <button className="px-4 py-2 border text-black cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
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
        Export
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
        <div className="py-1">
          <button
            onClick={exportToExcel}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Export as Excel (.xlsx)
          </button>
          <button
            onClick={exportToCSV}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Export as CSV (.csv)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportCustomers;
