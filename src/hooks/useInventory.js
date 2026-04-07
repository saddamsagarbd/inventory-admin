// hooks/useInventory.js
import { useState } from "react";
// import axios from "axios";

export const useInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for demonstration
  const mockProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      sku: "WH-001",
      image: "https://via.placeholder.com/40",
      currentStock: 45,
      lowStockThreshold: 20,
      status: "active",
    },
    {
      id: 2,
      name: "Smart Watch",
      sku: "SW-002",
      image: "https://via.placeholder.com/40",
      currentStock: 5,
      lowStockThreshold: 10,
      status: "active",
    },
    {
      id: 3,
      name: "Phone Case",
      sku: "PC-003",
      image: "https://via.placeholder.com/40",
      currentStock: 0,
      lowStockThreshold: 15,
      status: "active",
    },
    {
      id: 4,
      name: "Charging Cable",
      sku: "CC-004",
      image: "https://via.placeholder.com/40",
      currentStock: 120,
      lowStockThreshold: 30,
      status: "active",
    },
    {
      id: 5,
      name: "Screen Protector",
      sku: "SP-005",
      image: "https://via.placeholder.com/40",
      currentStock: 8,
      lowStockThreshold: 20,
      status: "active",
    },
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProducts(mockProducts);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async (productId, quantity, reason = null) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, currentStock: Math.max(0, quantity) }
            : product,
        ),
      );

      // Log stock adjustment
      if (reason) {
        console.log(
          `Stock adjusted for product ${productId}: ${quantity}, Reason: ${reason}`,
        );
      }

      setError(null);
    } catch (err) {
      setError("Failed to update stock");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generatePurchaseOrders = async (productIds, orderQuantities) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const orders = productIds.map((productId) => {
        const product = products.find((p) => p.id === productId);
        return {
          productId,
          productName: product.name,
          sku: product.sku,
          quantity: orderQuantities[productId],
          orderDate: new Date().toISOString(),
          status: "pending",
        };
      });

      console.log("Purchase orders generated:", orders);

      // You would typically save these to your backend
      setError(null);

      // Optionally update stock to reflect ordered quantity (or not, depending on business logic)
      return orders;
    } catch (err) {
      setError("Failed to generate purchase orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    updateStock,
    generatePurchaseOrders,
  };
};
