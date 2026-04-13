// hooks/useUsers.js
import { useState } from "react";
import api from '../config/axiosConfig';

export const useUsers = () => {
  const [Users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data
  const mockUsers = [
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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await api.get('/users');
      setUsers(result.data.user);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (id) => {
    setLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // const User = mockUsers.find((c) => c.id === parseInt(id));
      const result = await api.get(`/users/${id}`);
      return result.data.user;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (UserData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const newUser = {
        id: Users.length + 1,
        ...UserData,
        joinedDate: new Date().toISOString().split("T")[0],
        activities: [
          {
            type: "profile",
            description: "Account created",
            timestamp: new Date().toISOString(),
          },
        ],
      };

      //API call
      const result = await api.post('/users/create', newUser);

      setUsers([...Users, result.data.user]);
      // return newUser;
    } catch (err) {
      setError("Failed to create User");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, UserData) => {
    setLoading(true);
    try {
      const result = await api.put(`/users/${id}`, UserData);
      setUsers(
        result.data.user
      );
    } catch (err) {
      setError("Failed to update User");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (id, status) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUsers(
        Users.map((User) =>
          User.id === parseInt(id) ? { ...User, status } : User,
        ),
      );
    } catch (err) {
      setError("Failed to update User status");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendEmailToUser = async (id, emailData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Email sent to User ${id}:`, emailData);
      // Add to activity log
      const User = Users.find((c) => c.id === parseInt(id));
      if (User) {
        const activity = {
          type: "email",
          description: `Email sent: ${emailData.subject}`,
          timestamp: new Date().toISOString(),
        };
        User.activities = [activity, ...(User.activities || [])];
      }
    } catch (err) {
      setError("Failed to send email");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    Users,
    loading,
    error,
    fetchUsers,
    getUser,
    createUser,
    updateUser,
    updateUserStatus,
    sendEmailToUser,
  };
};
