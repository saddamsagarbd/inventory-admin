import React from "react";

const StockHistory = ({ stockHistory }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case "purchase":
        return "bg-green-100 text-green-800";
      case "sale":
        return "bg-blue-100 text-blue-800";
      case "adjustment":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">
        Stock Movement History
      </h3>
      <div className="space-y-3">
        {stockHistory.map((record, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(record.type)}`}
                >
                  {record.type.toUpperCase()}
                </span>
                <span className="text-sm text-gray-600">{record.date}</span>
              </div>
              <p className="text-gray-700 mt-1">{record.note}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                {record.quantity}
              </p>
              <p className="text-xs text-gray-500">units</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockHistory;
