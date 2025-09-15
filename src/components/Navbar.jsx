// src/components/NavBar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/API";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoadingUser(false));
  }, []);

  const handleLogout = async () => {
    try {
      await API.get("/auth/logout");
      setUser(null);
      setDropdownOpen(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#085cec] text-white px-8 py-3 flex justify-between items-center gap-6 rounded-full shadow-xl z-50 w-[90%] max-w-6xl">
      <Link to="/dashboard" className="relative group text-xl font-bold hover:text-[#b9c7de]">
        Mini CRM
        <div className="absolute left-1/2 -translate-x-1/2 top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-md whitespace-nowrap">
            Mini CRM is a project that Kshitij Satija made for Xeno.
        </div>
      </Link>

      {/* Right side: user / login */}
      <div className="relative min-w-[5rem] flex justify-end">
        {loadingUser ? (
          <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse"></div>
        ) : user ? (
          <div className="relative group">
            {/* Profile button with hover tooltip */}
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              {user.picture ? (
                <img
                  src={user.picture}
                  alt="profile"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 hover:scale-105 transition-transform">
                  {user.name?.[0]}
                </div>
              )}
            </button>

            {/* Tooltip */}
            <div className="absolute right-0 top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-md whitespace-nowrap">
              {user.name ? `Hi, ${user.name}` : "Profile"}
            </div>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-3 px-4 z-50">
                <p className="font-medium mb-3">Hi, {user.name}</p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login">
          
            <button
              class="overflow-hidden relative w-32 h-9 bg-[#085cec] text-white border-none rounded-md text-m font-bold cursor-pointer group flex items-center justify-center"
            >
              <span
                class="absolute w-36 h-32 -top-8 -left-2 bg-black rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0"
              ></span>

              <span
                class="absolute w-36 h-32 -top-8 -left-2 bg-[#3576e6] rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-0"
              ></span>

              <span
                class="absolute w-36 h-32 -top-8 -left-2 bg-[#085cec] rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left z-0"
              ></span>

              
              <span class="relative z-10 opacity-100 transition-opacity duration-500 group-hover:opacity-100">
                Sign In
              </span>
            </button>



          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
