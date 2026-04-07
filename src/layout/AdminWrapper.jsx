import AdminLayout from "./AdminLayout";
import { useState } from "react";

const AdminWrapper = () => {
  const [activeNav, setActiveNav] = useState("dashboard");

  return <AdminLayout activeNav={activeNav} onNavChange={setActiveNav} />;
};

export default AdminWrapper;
