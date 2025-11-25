import React from "react";
import {
  Home,
  BarChart3,
  Target,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Menu,
  DollarSign,
  User,
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onLogout?: () => void;
}

const menuItems = [
  { id: "dashboard", label: "Home", icon: Home },
  { id: "transactions", label: "Transactions", icon: BarChart3 },
  { id: "savings", label: "Savings & Goals", icon: Target },
  { id: "investments", label: "Investments", icon: TrendingUp },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({
  currentPage,
  setCurrentPage,
  collapsed,
  setCollapsed,
  onLogout,
}: SidebarProps) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      setCurrentPage("landing");
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 z-50 shadow-xl ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div
          className={`flex items-center space-x-3 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold">FinTech AI</h1>
              <p className="text-xs text-gray-400">Smart Finance</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary-500 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
                {isActive && !collapsed && (
                  <div className="h-1 bg-secondary-500 rounded-full mt-1 mx-3"></div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center space-x-3 p-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}
