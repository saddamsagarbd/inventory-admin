import React from "react";
import { AlertTriangle, X } from "lucide-react";

const DeleteConfirmation = ({ product, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Delete Product
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-red-500" size={24} />
            <p className="text-gray-700">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{product.name}</span>?
            </p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            This action cannot be undone. This product will be permanently
            removed from your store.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
