import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  DollarSign,
  ShoppingBag,
  History,
  Truck,
} from "lucide-react";
import StockHistory from "./components/StockHistory";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [orders, setOrders] = useState([]);
  const [stockHistory, setStockHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    // Mock API calls
    const mockProduct = {
      id: 1,
      name: "Wireless Headphones",
      sku: "WH-001",
      category: "Electronics",
      description:
        "Premium wireless headphones with noise cancellation and 30-hour battery life.",
      price: 99.99,
      salePrice: 79.99,
      cost: 45.0,
      stock: 45,
      lowStockThreshold: 10,
      status: "active",
      images: [
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400",
      ],
      createdAt: "2024-01-15",
      updatedAt: "2024-03-20",
    };

    const mockOrders = [
      {
        id: "ORD-001",
        customer: "John Doe",
        date: "2024-03-15",
        quantity: 2,
        total: 159.98,
        status: "delivered",
      },
      {
        id: "ORD-002",
        customer: "Jane Smith",
        date: "2024-03-10",
        quantity: 1,
        total: 79.99,
        status: "shipped",
      },
    ];

    const mockStockHistory = [
      {
        date: "2024-03-20",
        quantity: 45,
        type: "purchase",
        note: "Stock replenishment",
      },
      {
        date: "2024-03-15",
        quantity: 45,
        type: "sale",
        note: "Order ORD-001 (-2)",
      },
      {
        date: "2024-03-10",
        quantity: 47,
        type: "sale",
        note: "Order ORD-002 (-1)",
      },
    ];

    setProduct(mockProduct);
    setOrders(mockOrders);
    setStockHistory(mockStockHistory);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/admin/products"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back to Products
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-gray-600 mt-1">SKU: {product.sku}</p>
            </div>
            <div className="flex gap-3">
              <Link
                to={`/admin/products/edit/${product.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Product
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {product.stock}
                </p>
              </div>
              <Package className="text-blue-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </p>
                {product.salePrice && (
                  <p className="text-sm text-green-600">
                    Sale: ${product.salePrice}
                  </p>
                )}
              </div>
              <DollarSign className="text-green-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.length}
                </p>
              </div>
              <ShoppingBag className="text-purple-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  $
                  {orders
                    .reduce((sum, order) => sum + order.total, 0)
                    .toFixed(2)}
                </p>
              </div>
              <Truck className="text-orange-500" size={32} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex gap-4 px-6">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 px-2 text-sm font-medium transition ${
                  activeTab === "details"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`py-4 px-2 text-sm font-medium transition ${
                  activeTab === "orders"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`py-4 px-2 text-sm font-medium transition ${
                  activeTab === "history"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Stock History
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "details" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Product Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-medium">{product.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            product.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Created Date</p>
                        <p className="font-medium">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Updated</p>
                        <p className="font-medium">
                          {new Date(product.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Product Images
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {product.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Product ${index + 1}`}
                        className="h-40 w-full object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Orders containing this product
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 font-medium text-blue-600">
                            {order.id}
                          </td>
                          <td className="px-6 py-4">{order.customer}</td>
                          <td className="px-6 py-4">{order.date}</td>
                          <td className="px-6 py-4">{order.quantity}</td>
                          <td className="px-6 py-4">${order.total}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <StockHistory stockHistory={stockHistory} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
