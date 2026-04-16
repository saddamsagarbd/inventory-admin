import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminWrapper from "./layout/AdminWrapper";
import StoreList from "./pages/admin/stores/StoreList";
import CategoryManagement from "./pages/admin/CategoryManagement";
import ProductList from "./pages/admin/products/ProductList";
import AddEditProduct from "./pages/admin/products/AddEditProduct";
import ProductDetails from "./pages/admin/products/ProductDetails";
import Orders from "./pages/admin/orders/Orders";
import OrderDetailsPage from "./pages/admin/orders/OrderDetailsPage";
import Inventory from "./pages/admin/inventory/Inventory";
import LowStockAlerts from "./pages/admin/inventory/LowStock";
import Customers from "./pages/admin/customers/Customers";
import CustomerDetailsPage from "./pages/admin/customers/CustomerDetailsPage";
import CustomerFormPage from "./pages/admin/customers/CustomerFormPage";
import PaymentList from "./pages/admin/payments/PaymentList";
import PaymentDetails from "./pages/admin/payments/PaymentDetails";
import RefundManagement from "./pages/admin/payments/RefundManagement";
import ReportsDashboard from "./pages/admin/reports/ReportsDashboard";
import SalesReport from "./pages/admin/reports/SalesReport";
import OrderReport from "./pages/admin/reports/OrderReport";
import ScheduledReports from "./pages/admin/reports/ScheduledReports";
import NotFound from "./pages/admin/not found/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AddEditStore from "./pages/admin/stores/AddEditStore";
import StoreDetails from "./pages/admin/stores/StoreDetails";
import SupplierList from "./pages/admin/suppliers/SupplierList";
import AddEditSupplier from "./pages/admin/suppliers/AddEditSupplier";
import SupplierDetails from "./pages/admin/suppliers/SupplierDetails";
import Users from "./pages/admin/users/Users";
import UserDetailsPage from "./pages/admin/users/UserDetailsPage";
import UserFormPage from "./pages/admin/users/UserFormPage";
import Managers from "./pages/admin/manager/Managers";
import ManagerDetailsPage from "./pages/admin/manager/ManagerDetailsPage";
import ManagerFormPage from "./pages/admin/manager/ManagerFormPage";

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
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminWrapper />}>
            <Route path="dashboard" element={<DashboardPage />} />

            {/* 🔥 Store Routes */}
            <Route path="stores" element={<StoreList />} />
            <Route path="stores/add" element={<AddEditStore />} />
            <Route path="stores/edit/:id" element={<AddEditStore />} />
            <Route path="stores/:id" element={<StoreDetails />} />

            {/* 🔥 Supplier Routes */}
            <Route path="Suppliers" element={<SupplierList />} />
            <Route path="Suppliers/add" element={<AddEditSupplier />} />
            <Route path="Suppliers/edit/:id" element={<AddEditSupplier />} />
            <Route path="Suppliers/:id" element={<SupplierDetails />} />

            {/* 🔥 User Routes */}
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetailsPage />} />
            <Route path="users/add" element={<UserFormPage />} />
            <Route path="users/edit/:id" element={<UserFormPage />} />

            {/* 🔥 Manager Routes */}
            <Route path="managers" element={<Managers />} />
            <Route path="managers/:id" element={<ManagerDetailsPage />} />
            <Route path="managers/add" element={<ManagerFormPage />} />
            <Route path="managers/edit/:id" element={<ManagerFormPage />} />
            
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
        </Route>
        {/* 404 Not Found Route */}
      </Routes>
    </div>
  );
}

export default App;
