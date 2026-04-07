// pages/admin/reports/ScheduledReports.jsx
import { useState } from "react";

const SCHEDULED_REPORTS = [
  {
    id: 1,
    name: "Daily Sales Summary",
    type: "Sales Report",
    frequency: "daily",
    recipients: ["admin@example.com", "manager@example.com"],
    format: "PDF",
    lastSent: "2026-03-31T08:00:00",
    nextRun: "2026-04-01T08:00:00",
    active: true,
  },
  {
    id: 2,
    name: "Weekly Order Report",
    type: "Order Report",
    frequency: "weekly",
    recipients: ["admin@example.com"],
    format: "Excel",
    lastSent: "2026-03-28T09:00:00",
    nextRun: "2026-04-04T09:00:00",
    active: true,
  },
  {
    id: 3,
    name: "Monthly Performance",
    type: "Custom Report",
    frequency: "monthly",
    recipients: ["ceo@example.com", "finance@example.com"],
    format: "CSV",
    lastSent: "2026-03-01T10:00:00",
    nextRun: "2026-04-01T10:00:00",
    active: false,
  },
];

export default function ScheduledReports() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: "",
    type: "sales",
    frequency: "daily",
    recipients: "",
    format: "PDF",
  });

  const handleCreateSchedule = () => {
    console.log("Creating schedule:", newSchedule);
    setShowCreateModal(false);
    setNewSchedule({
      name: "",
      type: "sales",
      frequency: "daily",
      recipients: "",
      format: "PDF",
    });
  };

  const toggleReportStatus = (id) => {
    console.log("Toggle status for report:", id);
  };

  const deleteSchedule = (id) => {
    if (confirm("Are you sure you want to delete this scheduled report?")) {
      console.log("Delete schedule:", id);
    }
  };

  const runNow = (id) => {
    console.log("Running report now:", id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Scheduled Reports
            </h2>
            <p className="text-sm text-gray-500">
              Automate report delivery to your inbox on a regular schedule
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-(--color-primary) text-white rounded-lg hover:bg-(--color-primary-hover) transition-colors"
          >
            + New Schedule
          </button>
        </div>
      </div>

      {/* Scheduled Reports List */}
      <div className="space-y-4">
        {SCHEDULED_REPORTS.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {report.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      report.active
                        ? "bg-green-100 text-(--color-primary)"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {report.active ? "Active" : "Paused"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Report Type:</span>
                    <span className="ml-2 font-medium text-gray-700">
                      {report.type}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Frequency:</span>
                    <span className="ml-2 font-medium text-gray-700 capitalize">
                      {report.frequency}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Format:</span>
                    <span className="ml-2 font-medium text-gray-700">
                      {report.format}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Recipients:</span>
                    <span className="ml-2 font-medium text-gray-700">
                      {report.recipients.length}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 mt-3 text-xs">
                  <div>
                    <span className="text-gray-500">Last sent:</span>
                    <span className="ml-1 text-gray-600">
                      {new Date(report.lastSent).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Next run:</span>
                    <span className="ml-1 text-gray-600">
                      {new Date(report.nextRun).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleReportStatus(report.id)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    report.active
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "bg-green-100 text-(--color-primary) hover:bg-(--color-primary-hover)"
                  }`}
                >
                  {report.active ? "Pause" : "Activate"}
                </button>
                <button
                  onClick={() => runNow(report.id)}
                  className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                >
                  Run Now
                </button>
                <button
                  onClick={() => deleteSchedule(report.id)}
                  className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Schedule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Schedule New Report
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Name
                </label>
                <input
                  type="text"
                  value={newSchedule.name}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-(--color-primary)"
                  placeholder="e.g., Weekly Sales Report"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type
                </label>
                <select
                  value={newSchedule.type}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="sales">Sales Report</option>
                  <option value="orders">Order Report</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  value={newSchedule.frequency}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      frequency: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly (Monday)</option>
                  <option value="monthly">Monthly (1st day)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select
                  value={newSchedule.format}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, format: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="PDF">PDF</option>
                  <option value="Excel">Excel</option>
                  <option value="CSV">CSV</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipients (comma separated)
                </label>
                <input
                  type="text"
                  value={newSchedule.recipients}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      recipients: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="email1@example.com, email2@example.com"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={handleCreateSchedule}
                className="flex-1 px-4 py-2 bg-(--color-primary) text-white rounded-lg hover:bg-(--color-primary-hover)"
              >
                Create Schedule
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
