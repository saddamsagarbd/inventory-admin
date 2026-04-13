import React from "react";
import { Link } from "react-router-dom";

const UserTable = ({ Users }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case true:
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
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
            {Users.map((User) => (
              <tr
                key={User.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {User.avatar ? (
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={User.avatar}
                        alt={User.name}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {getInitials(User.name)}
                        </span>
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {User.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Joined {formatDate(User.joinedDate)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{User.email}</div>
                  {User.phone && (
                    <div className="text-sm text-gray-500">
                      {User.phone}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(User.is_active)}`}
                  >
                    {User.is_active ?"Active":"in-active"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/admin/users/${User._id}`}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/users/edit/${User._id}`}
                    className="text-green-600 hover:text-green-900"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {Users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No Users found</p>
        </div>
      )}
    </div>
  );
};

export default UserTable;
