import React, { useEffect, useState } from "react";
import API from "../api/api";

import googleLogo from "../assets/google_logo.png"; // <-- Import your local asset
import "../App.css";
const LoginPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URI}/api/auth/google`;
  };

  const handleLogout = async () => {
    try {
      await API.get("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#085cec]">
      {/* LEFT: big "xeno" */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-white font-bold leading-none select-none text-7xl md:text-8xl">
          xeno
        </h1>
        <h4 className="text-white select-none text-lg md:text-xl mt-2">
          mini crm
        </h4>
      </div>

      {/* RIGHT: login card */}
      <div className="flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] p-10">
          {!user ? (
            <>
              <h2 className="text-3xl font-semibold mb-6 text-center">
                Sign In
              </h2>
              <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-200 custom-shadow"
              >
                <img src={googleLogo} alt="Google" className="w-5 h-5" />
                <span className="font-medium">Sign in with Google</span>
              </button>


            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">
                Welcome, {user.name}
              </h2>
              <img
                src={user.picture}
                alt="profile"
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />
              <p className="text-gray-600 mb-5">{user.email}</p>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
