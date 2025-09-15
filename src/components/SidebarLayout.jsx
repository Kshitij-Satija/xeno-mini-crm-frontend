import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

import { Menu, X } from "lucide-react";

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-4 top-1/2 -translate-y-1/2 h-[70vh] bg-[#085cec] text-white transition-all duration-300 ease-in-out shadow-2xl rounded-2xl z-40 overflow-hidden flex flex-col ${
          isSidebarOpen ? "w-40 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <button
            className="self-end m-4 text-white hover:text-gray-300"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation links */}
          <nav className="flex flex-col items-center justify-center flex-1 gap-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md w-4/5 text-center transition-colors ${
                  isActive
                    ? "bg-[#3576e6] font-semibold shadow-md"
                    : "hover:bg-[#1663e9]"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/campaigns"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md w-4/5 text-center transition-colors ${
                  isActive
                    ? "bg-[#3576e6] font-semibold shadow-md"
                    : "hover:bg-[#1663e9]"
                }`
              }
            >
              Campaigns
            </NavLink>
            <NavLink
              to="/customers"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md w-4/5 text-center transition-colors ${
                  isActive
                    ? "bg-[#3576e6] font-semibold shadow-md"
                    : "hover:bg-[#1663e9]"
                }`
              }
            >
              Customers
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md w-4/5 text-center transition-colors ${
                  isActive
                    ? "bg-[#3576e6] font-semibold shadow-md"
                    : "hover:bg-[#1663e9]"
                }`
              }
            >
              Orders
            </NavLink>
            
          </nav>
        </div>
      </aside>

      {/* Floating open button with tooltip */}
      {!isSidebarOpen && (
        <div className="fixed top-1/2 -translate-y-1/2 left-4 z-50 group">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-[#1663e9] text-white rounded-full shadow-lg p-3 hover:bg-[#085cec] transition-all relative"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Tooltip */}
          <div className="absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg shadow-md transition-all">
            Open Menu
          </div>
        </div>
      )}

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-[11rem]" : "ml-0"
        }`}
      >
        
        <main className="flex-1 mt-20 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
