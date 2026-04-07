// Navigation configuration — edit here to add/remove nav items
export const NAV = [
  {
    section: "Main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "📊",
        path: "/admin/dashboard",
      },
    ],
  },
  {
    section: "Catalog",
    items: [
      {
        id: "category",
        label: "Category",
        icon: "🗂️",
        path: "/admin/categories",
      },
      {
        id: "product",
        label: "Product",
        icon: "📦",
        path: "/admin/products",
      },
    ],
  },
  {
    section: "Sales",
    items: [
      {
        id: "order",
        label: "Order",
        icon: "🛍️",
        badge: 12,
        path: "/admin/orders",
      },
      {
        id: "inventory",
        label: "Inventory",
        icon: "📦",
        badge: 8,
        path: "/admin/inventory",
      },
      {
        id: "payments",
        label: "Payments",
        icon: "💳",
        path: "/admin/payments",
      },
      {
        id: "reports",
        label: "Reports",
        icon: "📈",
        path: "/admin/reports",
      },
      // {
      //   id: "coupon",
      //   label: "Coupons",
      //   icon: "🎟️",
      //   path: "/admin/coupons",
      // },
    ],
  },
  {
    section: "Settings",
    items: [
      {
        id: "customers",
        label: "Customers",
        icon: "👥",
        path: "/admin/customers",
      },
      {
        id: "adminUsers",
        label: "Users",
        icon: "👤",
        path: "/admin/users",
      },
      {
        id: "settings",
        label: "Settings",
        icon: "⚙️",
        path: "/admin/settings",
      },
    ],
  },
];

export const BREADCRUMBS = {
  dashboard: ["Admin", "Dashboard"],
  category: ["Admin", "Catalog", "Category"],
  product: ["Admin", "Catalog", "Product"],
  order: ["Admin", "Sales", "Order"],
  inventory: ["Admin", "Sales", "Inventory"],

  customers: ["Admin", "Customers"],
  payments: ["Admin", "Payments"],
  reports: ["Admin", "Reports"],
  adminUsers: ["Admin", "Users"],
  settings: ["Admin", "Settings"],
};
