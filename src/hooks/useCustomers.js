// hooks/useCustomers.js
import { useState } from "react";

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data
  const mockCustomers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      avatar: null,
      joinedDate: "2023-01-15",
      totalOrders: 12,
      totalSpent: 1245.5,
      lastOrderDate: "2024-03-15",
      status: "active",
      addresses: [
        {
          id: 1,
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
          phone: "+1 (555) 123-4567",
          isDefault: true,
        },
      ],
      orders: [
        {
          id: "ORD-001",
          date: "2024-03-15",
          total: 125.5,
          status: "completed",
        },
        {
          id: "ORD-002",
          date: "2024-02-20",
          total: 89.99,
          status: "processing",
        },
      ],
      activities: [
        {
          type: "order",
          description: "Placed order #ORD-001",
          timestamp: "2024-03-15T10:30:00",
        },
        {
          type: "login",
          description: "Logged in from New York, NY",
          timestamp: "2024-03-14T09:15:00",
        },
        {
          type: "profile",
          description: "Updated shipping address",
          timestamp: "2024-03-10T14:20:00",
        },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      avatar: null,
      joinedDate: "2023-03-20",
      totalOrders: 5,
      totalSpent: 567.8,
      lastOrderDate: "2024-03-10",
      status: "active",
      addresses: [],
      orders: [],
      activities: [],
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.j@example.com",
      phone: "+1 (555) 456-7890",
      avatar: null,
      joinedDate: "2023-06-10",
      totalOrders: 0,
      totalSpent: 0,
      lastOrderDate: null,
      status: "inactive",
      addresses: [],
      orders: [],
      activities: [],
    },
  ];

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCustomers(mockCustomers);
      setError(null);
    } catch (err) {
      setError("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  const getCustomer = async (id) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const customer = mockCustomers.find((c) => c.id === parseInt(id));
      return customer;
    } catch (err) {
      setError("Failed to fetch customer details");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async (customerData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const newCustomer = {
        id: customers.length + 1,
        ...customerData,
        joinedDate: new Date().toISOString().split("T")[0],
        totalOrders: 0,
        totalSpent: 0,
        orders: [],
        activities: [
          {
            type: "profile",
            description: "Account created",
            timestamp: new Date().toISOString(),
          },
        ],
      };
      setCustomers([...customers, newCustomer]);
      return newCustomer;
    } catch (err) {
      setError("Failed to create customer");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (id, customerData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setCustomers(
        customers.map((customer) =>
          customer.id === parseInt(id)
            ? { ...customer, ...customerData }
            : customer,
        ),
      );
    } catch (err) {
      setError("Failed to update customer");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCustomerStatus = async (id, status) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCustomers(
        customers.map((customer) =>
          customer.id === parseInt(id) ? { ...customer, status } : customer,
        ),
      );
    } catch (err) {
      setError("Failed to update customer status");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendEmailToCustomer = async (id, emailData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Email sent to customer ${id}:`, emailData);
      // Add to activity log
      const customer = customers.find((c) => c.id === parseInt(id));
      if (customer) {
        const activity = {
          type: "email",
          description: `Email sent: ${emailData.subject}`,
          timestamp: new Date().toISOString(),
        };
        customer.activities = [activity, ...(customer.activities || [])];
      }
    } catch (err) {
      setError("Failed to send email");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    updateCustomerStatus,
    sendEmailToCustomer,
  };
};
