import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/amdin/DashboardPage";
import AdminWrapper from "./layout/AdminWrapper";
import CategoryManagement from "./pages/amdin/CategoryManagement";
import ProductList from "./pages/amdin/products/ProductList";
import AddEditProduct from "./pages/amdin/products/AddEditProduct";
import ProductDetails from "./pages/amdin/products/ProductDetails";
import Orders from "./pages/amdin/orders/Orders";
import OrderDetailsPage from "./pages/amdin/orders/OrderDetailsPage";
import Inventory from "./pages/amdin/inventory/Inventory";
import LowStockAlerts from "./pages/amdin/inventory/LowStock";
import Customers from "./pages/amdin/customers/Customers";
import CustomerDetailsPage from "./pages/amdin/customers/CustomerDetailsPage";
import CustomerFormPage from "./pages/amdin/customers/CustomerFormPage";
import PaymentList from "./pages/amdin/payments/PaymentList";
import PaymentDetails from "./pages/amdin/payments/PaymentDetails";
import RefundManagement from "./pages/amdin/payments/RefundManagement";
import ReportsDashboard from "./pages/amdin/reports/ReportsDashboard";
import SalesReport from "./pages/amdin/reports/SalesReport";
import OrderReport from "./pages/amdin/reports/OrderReport";
import ScheduledReports from "./pages/amdin/reports/ScheduledReports";
import NotFound from "./pages/amdin/not found/NotFound";

// Dummy components for example

function App() {
  return (
    <div>
      {/* <Navbar /> This stays visible on all pages */}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* ✅ ADMIN ROUTES */}
        <Route path="/admin" element={<AdminWrapper />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="categories" element={<CategoryManagement />} />

          {/* 🔥 Product Routes */}
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<AddEditProduct />} />
          <Route path="products/edit/:id" element={<AddEditProduct />} />
          <Route path="products/:id" element={<ProductDetails />} />
          {/* 🔥 Inventory Routes */}
          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/low-stock" element={<LowStockAlerts />} />

          {/* 🔥 Order Routes */}
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetailsPage />} />
          {/* 🔥 Customer Routes */}
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetailsPage />} />
          <Route path="customers/add" element={<CustomerFormPage />} />
          <Route path="customers/edit/:id" element={<CustomerFormPage />} />
          {/* 🔥 Payment Routes */}
          <Route path="payments" element={<PaymentList />} />
          <Route path="payments/:id" element={<PaymentDetails />} />
          <Route path="payments/:id/refund" element={<RefundManagement />} />

          <Route path="reports" element={<ReportsDashboard />}>
            <Route index element={<SalesReport />} />
            <Route path="sales" element={<SalesReport />} />
            <Route path="orders" element={<OrderReport />} />
            <Route path="scheduled" element={<ScheduledReports />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* 404 Not Found Route */}
      </Routes>
    </div>
  );
}

export default App;
