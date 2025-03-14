import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import SimpleLogoutButton from "../components/SimpleLogoutButton";
import { Routes, Route, useNavigate } from "react-router-dom";
import InventoryDashboard from "../pages/InventoryManager/InventoryDashboard";
import Inventory from "../pages/InventoryManager/Inventory";
import InventoryOrder from "../pages/InventoryManager/InventoryOrder";
import InventoryNotification from "../pages/InventoryManager/InventoryNotification";

const InventoryManagerLayout: React.FC = () => {
  const navigate = useNavigate();

  // Check if user is authenticated and has the correct role
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    if (!token || !userString || role !== 'Inventoryman') {
      navigate('/login');
    }
  }, [navigate]);

  const inventoryManagerLinks = [
    { name: "Dashboard", path: "/inventory-manager/dashboard" },
    { name: "Inventory", path: "/inventory-manager/inventory" },
    { name: "Orders", path: "/inventory-manager/order" },
    { name: "Notifications", path: "/inventory-manager/notifications" },
  ];

  // Sample data for inventory orders
  const sampleOrders = [
    {
      name: "Surgical Masks",
      supplier: "Medical Supplies Inc.",
      category: "PPE",
      arrival: "3 days",
      status: "shipped"
    },
    {
      name: "Disposable Gloves",
      supplier: "Healthcare Products Ltd.",
      category: "PPE",
      arrival: "1 day",
      status: "arrived"
    }
  ];

  return (
    <div className="flex">
      <Sidebar links={inventoryManagerLinks} />
      <div className="flex-1 overflow-y-scroll h-screen pt-10 sm:pt-0 bg-gray-900">
        <SimpleLogoutButton />
        <Routes>
          <Route path="dashboard" element={<InventoryDashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="order" element={<InventoryOrder orders={sampleOrders} />} />
          <Route path="notifications" element={<InventoryNotification/>} />
        </Routes>
      </div>
    </div>
  );
};

export default InventoryManagerLayout;
