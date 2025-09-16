import React from "react";
import { Search, Bell, ChevronDown, Filter } from "lucide-react";

interface TopBarProps {
  darkMode?: boolean;
}

export default function TopBar({ darkMode = false }: TopBarProps) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-b p-4 shadow-sm`}
    >
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex items-center space-x-4 flex-1">
          <form onSubmit={handleSearch} className="relative max-w-md w-full">
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="Search transactions..."
                className={`w-full pl-10 pr-12 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
              <button
                type="submit"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
                  darkMode
                    ? "hover:bg-gray-600 text-gray-400 hover:text-white"
                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                }`}
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Date Filter */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Filter
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <select
                className={`pl-10 pr-8 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer transition-all ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option>This Month</option>
                <option>This Week</option>
                <option>Today</option>
                <option>This Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button
            className={`relative p-2 rounded-lg transition-colors ${
              darkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Profile */}
          <div
            className={`flex items-center space-x-3 cursor-pointer rounded-xl p-2 transition-colors ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
            }`}
          >
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop"
              alt="Profile"
              className="w-9 h-9 rounded-xl object-cover border-2 border-gray-200"
            />
            <div className="text-left">
              <p
                className={`text-sm font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Alex Johnson
              </p>
              <p
                className={`text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Premium User
              </p>
            </div>
            <ChevronDown
              className={`w-4 h-4 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
