import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import MainLayout from "./components/SidebarLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CustomerPage from "./pages/CustomerPage";
import OrderPage from "./pages/OrderPage";
import MainCampaignPage from "./pages/MainCampaignPage";
import CampaignCreationPage from "./pages/CampaignCreationPage";
import CampaignHistoryPage from "./pages/CampaignHistoryPage";
import LandingPage from "./pages/LandingPage";

// Wrapper that conditionally shows Navbar
const AppLayout = ({ children }) => {
  const location = useLocation();
  const noNavbarRoutes = ["/login", "/404"]; // pages where navbar is hidden

  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <AppLayout>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/404" element={<h1 className="text-center text-3xl">404 - Page Not Found</h1>} />
        

        {/* Protected routes inside MainLayout */}
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute isAuthenticated={true} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/campaigns" element={<MainCampaignPage />} />
            <Route path="/campaigns/create" element={<CampaignCreationPage />} />
            <Route path="/campaigns/history" element={<CampaignHistoryPage />} />
          </Route>
        </Route>

        {/* Catch-All → go to 404 */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
