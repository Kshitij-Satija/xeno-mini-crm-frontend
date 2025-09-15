import React, { useEffect, useState } from "react";
import API from "../api/API";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#4F46E5", "#EC4899", "#F59E0B", "#10B981", "#EF4444", "#3B82F6"];

const DashboardPage = () => {
  const [stats, setStats] = useState({
    campaigns: 0,
    customers: 0,
    orders: 0,
    messagesSent: 0,
    messagesFailed: 0,
    messagesPending: 0,
    totalAudience: 0,
    totalLifetimeSpend: 0,
    totalRevenue: 0,
    genderDistribution: {},
    ageDistribution: {},
    statusSummary: { PENDING: 0, SCHEDULED: 0, PROCESSING: 0, COMPLETED: 0 },
    recentCampaigns: [],
    recentCustomers: [],
    recentOrders: [],
    ordersByStatus: {},
    recentMessages: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/dashboard/overview");
        const data = res.data || {};
        setStats({
          campaigns: data.campaigns || 0,
          customers: data.customers || 0,
          orders: data.orders || 0,
          messagesSent: data.messagesSent || 0,
          messagesFailed: data.messagesFailed || 0,
          messagesPending: data.messagesPending || 0,
          totalAudience: data.totalAudience || 0,
          totalLifetimeSpend: data.totalLifetimeSpend || 0,
          totalRevenue: data.totalRevenue || 0,
          genderDistribution: data.genderDistribution || {},
          ageDistribution: data.ageDistribution || {},
          statusSummary: data.statusSummary || { PENDING: 0, SCHEDULED: 0, PROCESSING: 0, COMPLETED: 0 },
          recentCampaigns: Array.isArray(data.recentCampaigns) ? data.recentCampaigns : [],
          recentCustomers: Array.isArray(data.recentCustomers) ? data.recentCustomers : [],
          recentOrders: Array.isArray(data.recentOrders) ? data.recentOrders : [],
          ordersByStatus: data.ordersByStatus || {},
          recentMessages: Array.isArray(data.recentMessages) ? data.recentMessages : [],
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to fetch dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const statCards = [
    { label: "Campaigns", value: stats.campaigns },
    { label: "Customers", value: stats.customers },
    { label: "Orders", value: stats.orders },
    { label: "Messages Sent", value: stats.messagesSent },
    { label: "Messages Failed", value: stats.messagesFailed },
    { label: "Messages Pending", value: stats.messagesPending },
    { label: "Total Audience", value: stats.totalAudience },
    { label: "Lifetime Spend (₹)", value: stats.totalLifetimeSpend },
    { label: "Total Revenue (₹)", value: stats.totalRevenue },
  ];

  const genderData = Object.entries(stats.genderDistribution).map(([name, value]) => ({ name, value }));
  const ageData = Object.entries(stats.ageDistribution).map(([name, value]) => ({ name, value }));
  const statusData = Object.entries(stats.statusSummary).map(([status, count]) => ({ status, count }));

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📊 Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {statCards.map(({ label, value }) => (
          <div
            key={label}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-5 shadow-md hover:shadow-xl transition flex flex-col justify-between"
          >
            <h4 className="font-medium">{label}</h4>
            <p className="text-2xl font-bold mt-2">{value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gender Distribution */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4 text-gray-700">👤 Gender Distribution</h3>
          {genderData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {genderData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500">No gender data</p>}
        </div>

        {/* Age Distribution */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4 text-gray-700">👥 Age Distribution</h3>
          {ageData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={ageData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {ageData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500">No age data</p>}
        </div>
      </div>

      {/* Campaign Status */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4 text-gray-700">📌 Campaign Status Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={statusData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4 text-gray-700">🆕 Recent Campaigns</h3>
        {stats.recentCampaigns.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {stats.recentCampaigns.map((c) => (
              <li key={c._id} className="py-3 flex justify-between items-center">
                <span className="font-medium">{c.campaignName || "Unnamed Campaign"}</span>
                <span className="text-sm font-semibold text-gray-700">{c.status}</span>
                <span className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-500">No recent campaigns</p>}
      </div>

      {/* Recent Messages */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4 text-gray-700">✉️ Recent Messages</h3>
        {stats.recentMessages.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {stats.recentMessages.map((m) => (
              <li key={m._id} className="py-2">
                To Customer #{m.customerNumericId}: "{m.message}" — <strong>{m.status}</strong>
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-500">No recent messages</p>}
      </div>
    </div>
  );
};

export default DashboardPage;
