import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const SupplierTable = ({
  Suppliers,
  selectedSuppliers,
  setSelectedSuppliers,
  onDelete,
  getStockStatus,
}) => {
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSuppliers(Suppliers.map((s) => s.id));
    } else {
      setSelectedSuppliers([]);
    }
  };


  const handleSelectOne = (SupplierId) => {
    if (selectedSuppliers.includes(SupplierId)) {
      setSelectedSuppliers(selectedSuppliers.filter((id) => id !== SupplierId));
    } else {
      setSelectedSuppliers([...selectedSuppliers, SupplierId]);
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
                    selectedSuppliers.length === Suppliers.length &&
                    Suppliers.length > 0
                  }
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name/ Address
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
            {Suppliers.map((Supplier) => {
              const stockStatus = getStockStatus(
                Supplier.stock,
                Supplier.lowStockThreshold,
              );
              return (
                <tr key={Supplier.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedSuppliers.includes(Supplier.id)}
                      onChange={() => handleSelectOne(Supplier.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}
                    >
                      {Supplier.code}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {Supplier.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      Address: {Supplier.fullAddress}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        Supplier.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {Supplier.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/Suppliers/${Supplier.id}`}
                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        to={`/admin/Suppliers/edit/${Supplier.id}`}
                        className="text-green-600 hover:text-green-900 cursor-pointer"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => onDelete(Supplier)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
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
      {Suppliers.length === 0 && (
        <div className="text-center py-12 text-gray-500">No Suppliers found</div>
      )}
    </div>
  );
};

export default SupplierTable;
