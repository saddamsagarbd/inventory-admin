// components/inventory/InventoryTable.jsx
import React, { useState } from "react";

const InventoryTable = ({ products, onStockUpdate, onAdjustStock }) => {
  const [editingStock, setEditingStock] = useState(null);
  const [tempStock, setTempStock] = useState("");

  const getStockStatusColor = (currentStock, threshold) => {
    if (currentStock === 0) return "bg-red-100 text-red-800";
    if (currentStock <= threshold) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const getStockStatusText = (currentStock, threshold) => {
    if (currentStock === 0) return "Out of Stock";
    if (currentStock <= threshold) return "Low Stock";
    return "In Stock";
  };

  const handleStockEdit = (product) => {
    setEditingStock(product.id);
    setTempStock(product.currentStock.toString());
  };

  const handleStockSave = (productId) => {
    const newStock = parseInt(tempStock);
    if (!isNaN(newStock) && newStock >= 0) {
      onStockUpdate(productId, newStock);
    }
    setEditingStock(null);
    setTempStock("");
  };

  const handleKeyPress = (e, productId) => {
    if (e.key === "Enter") {
      handleStockSave(productId);
    }
    if (e.key === "Escape") {
      setEditingStock(null);
      setTempStock("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Threshold
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={product.image || "/api/placeholder/40/40"}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.sku}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingStock === product.id ? (
                    <input
                      type="number"
                      value={tempStock}
                      onChange={(e) => setTempStock(e.target.value)}
                      onBlur={() => handleStockSave(product.id)}
                      onKeyDown={(e) => handleKeyPress(e, product.id)}
                      className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                      min="0"
                    />
                  ) : (
                    <span
                      className="text-sm text-gray-900 cursor-pointer hover:text-blue-600"
                      onClick={() => handleStockEdit(product)}
                    >
                      {product.currentStock}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {product.lowStockThreshold}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatusColor(product.currentStock, product.lowStockThreshold)}`}
                  >
                    {getStockStatusText(
                      product.currentStock,
                      product.lowStockThreshold,
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onAdjustStock(product)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Adjust
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
