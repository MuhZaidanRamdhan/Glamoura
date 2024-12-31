import React, { useState } from "react";
import { Bell, Search, User, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { logout } from "../../services/AuthService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const HeaderAdmin = ({ isSidebarOpen, onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem('token'); 
  
    if (token) {
      logout();
      Swal.fire({
        title: "Logged out!",
        text: "You have been successfully logged out.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/");
    } else {
      Swal.fire({
        title: "Error!",
        text: "No active session found.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Sidebar Toggle - Only visible on mobile */}
        <div className="md:hidden">
          <button 
            onClick={onToggleSidebar} 
            className="p-2 hover:bg-gray-800 rounded-md transition-colors"
            aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Admin Panel Title - Visible on desktop */}
        <h1 className="text-xl font-semibold hidden md:block">Admin Glamoura</h1>

        {/* Search Input */}
        <div className="relative flex-grow max-w-md mx-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button 
            className="p-2 hover:bg-gray-800 rounded-md relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800 p-2 rounded transition-colors"
            >
              <User size={20} />
              <span className="hidden md:inline">Admin</span>
              <ChevronDown size={16} />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  <li>
                    <a 
                      href="#profile" 
                      className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </a>
                  </li>
                  {/* <li>
                    <button 
                      href="#logout" 
                      className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </li> */}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;