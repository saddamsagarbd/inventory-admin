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
import api from '../../../config/axiosConfig';

const StoreDetails = () => {
  const { id } = useParams();
  const [Store, setStore] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [orders, setOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      setLoading(true);
      // Mock API calls
      const result = await api.get(`/store/${id}`);

      setStore(result.data.data);
      
      setLoading(false);
    };
    fetchStoreDetails();
  }, [id]);

  

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
            to="/admin/stores"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back to Stores
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {Store.code} - {Store.name}
              </h1>
              <p className="text-gray-600 mt-1">Address: {Store.fullAddress}</p>
            </div>
            <div className="flex gap-3">
              <Link
                to={`/admin/stores/edit/${id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Store
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
                  {Store.stock}
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
                  ${Store.price}
                </p>
                {Store.salePrice && (
                  <p className="text-sm text-green-600">
                    Sale: ${Store.salePrice}
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
                  { orders != 0 ? orders
                    .reduce((sum, order) => sum + order.total, 0)
                    .toFixed(2) : 0 }
                </p>
              </div>
              <Truck className="text-orange-500" size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
