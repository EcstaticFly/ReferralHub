import React, { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Megaphone,
  Users,
  User,
  LogOut,
  MessageCircle,
  Send,
} from "lucide-react";
import Dashboard from "../components/Dashboard";
import Campaigns from "../components/Campaigns";
import Customers from "../components/Customers";
import { authStore } from "../store/authStore";
import {AnimatePresence, motion} from "framer-motion";

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
  const { logout } = authStore();
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleMenuItemClick = (itemName) => {
    setActiveComponent(itemName);
    setSidebarOpen(false);
  };

  
  const ChatbotContainer = () => (
    <AnimatePresence mode="wait">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "tween", duration: 0.3 }}
      className="
      fixed bottom-24 right-6 
      w-80 bg-white dark:bg-gray-800 
      rounded-lg shadow-2xl 
      border dark:border-gray-700
    "
    >
      <div
        className="
        bg-blue-600 text-white 
        p-4 flex justify-between items-center 
        rounded-t-lg
      "
      >
        <h3 className="font-semibold">AI Chatbot</h3>
        <button
          onClick={() => setIsChatbotOpen(false)}
          className="hover:bg-blue-700 p-1 rounded-full"
        >
          <X size={20} />
        </button>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        <p className="text-gray-600 dark:text-gray-300">
          Chat functionality to be implemented
        </p>
      </div>
      <div className="p-4 border-t dark:border-gray-700 flex space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="
            flex-1 p-2 rounded 
            bg-gray-100 dark:bg-gray-700 
            dark:text-white
          "
        />
        <button
          className="
          bg-blue-600 text-white 
          p-2 rounded 
          hover:bg-blue-700
        "
        >
          <Send size={20} />
        </button>
      </div>
    </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`fixed z-30 w-64 h-full bg-white dark:bg-gray-800 
          shadow-lg transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold dark:text-white">Menu</h2>
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="text-gray-600 dark:text-gray-300" size={24} />
          </button>
        </div>
        
        {/* Menu Items */}
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
            <LogOut className="size-5" />
            <span className="">Logout</span>
          </button>
        </div>
        
        {/* Business Name & Email */}
        <div className="absolute bottom-26 left-4 right-4 flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <User size={24} className="text-gray-600 dark:text-gray-300" />
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white">Business Name</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">email@example.com</p>
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
      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="
          fixed bottom-6 right-6 
          bg-blue-600 text-white 
          p-4 rounded-full 
          shadow-2xl hover:bg-blue-700 
          transition-colors
        "
      >
        <MessageCircle size={24} />
      </button>

      {isChatbotOpen && <ChatbotContainer />}
    </div>
  );
};

export default HomePage;