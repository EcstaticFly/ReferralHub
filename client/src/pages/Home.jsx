import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Megaphone,
  Users,
  User,
  LogOut,
  MessageCircle,
} from "lucide-react";
import Dashboard from "../components/Dashboard";
import Campaigns from "../components/Campaigns";
import Customers from "../components/Customers";
import Chatbot from "../components/Chatbot"; // Import our new Chatbot component
import { authStore } from "../store/authStore";
import { AnimatePresence, motion } from "framer-motion";

const menuItems = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    component: <Dashboard />,
  },
  {
    name: "Campaigns",
    icon: <Megaphone size={20} />,
    component: <Campaigns />,
  },
  { name: "Customers", icon: <Users size={20} />, component: <Customers /> },
];

const HomePage = () => {
  const { logout, user } = authStore();
  const [activeComponent, setActiveComponent] = useState(() => {
    return localStorage.getItem("activeComponent") || "Dashboard";
  });
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    const storedComponent = localStorage.getItem("activeComponent");
    if (storedComponent) {
      setActiveComponent(storedComponent);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeComponent", activeComponent);
  }, [activeComponent]);
  
  const handleMenuItemClick = (itemName) => {
    setActiveComponent(itemName);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`fixed z-30 w-64 h-full bg-white dark:bg-gray-800 
          shadow-lg transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold dark:text-white">Menu</h2>
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="text-gray-600 dark:text-gray-300" size={24} />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center gap-3 p-4 text-left rounded transition duration-200
                ${
                  activeComponent === item.name
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              onClick={() => handleMenuItemClick(item.name)}
            >
              {React.cloneElement(item.icon, {
                className:
                  activeComponent === item.name
                    ? "text-white"
                    : "text-gray-500 dark:text-gray-400",
              })}
              {item.name}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <button
            className="bg-red-800 flex w-full items-center gap-3 p-3 text-left rounded transition duration-200 text-white hover:bg-red-700 cursor-pointer"
            onClick={logout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        <div className="absolute bottom-26 left-4 right-4 flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <User size={24} className="text-gray-600 dark:text-gray-300" />
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white">{user?.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">{user?.email}</p>
          </div>
        </div>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between">
          <button
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} className="text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-xl font-bold dark:text-white">
            {activeComponent}
          </h1>
          <div className="w-10" />
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            {menuItems.find((item) => item.name === activeComponent)?.component}
          </div>
        </div>
      </div>
      
      {/* Chatbot toggle button */}
      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="
          fixed bottom-6 right-6 
          bg-blue-600 text-white 
          p-4 rounded-full 
          shadow-2xl hover:bg-blue-700 
          transition-colors
          z-40
        "
      >
        <MessageCircle size={24} />
      </button>

      {/* Our new Chatbot component */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
};

export default HomePage;