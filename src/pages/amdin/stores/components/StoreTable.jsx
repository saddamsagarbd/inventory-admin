import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const StoreTable = ({
  Stores,
  selectedStores,
  setSelectedStores,
  onDelete,
  getStockStatus,
}) => {
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStores(Stores.map((p) => p.id));
    } else {
      setSelectedStores([]);
    }
  };

  const handleSelectOne = (StoreId) => {
    if (selectedStores.includes(StoreId)) {
      setSelectedStores(selectedStores.filter((id) => id !== StoreId));
    } else {
      setSelectedStores([...selectedStores, StoreId]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedStores.length === Stores.length &&
                    Stores.length > 0
                  }
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name / SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Stores.map((Store) => {
              const stockStatus = getStockStatus(
                Store.stock,
                Store.lowStockThreshold,
              );
              return (
                <tr key={Store.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedStores.includes(Store.id)}
                      onChange={() => handleSelectOne(Store.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={Store.image}
                      alt={Store.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {Store.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      SKU: {Store.sku}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">${Store.price}</div>
                    {Store.salePrice && (
                      <div className="text-sm text-green-600">
                        Sale: ${Store.salePrice}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}
                    >
                      {stockStatus.label} ({Store.stock})
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        Store.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {Store.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/Stores/${Store.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        to={`/admin/Stores/edit/${Store.id}`}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => onDelete(Store)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {Stores.length === 0 && (
        <div className="text-center py-12 text-gray-500">No Stores found</div>
      )}
    </div>
  );
};

export default StoreTable;
