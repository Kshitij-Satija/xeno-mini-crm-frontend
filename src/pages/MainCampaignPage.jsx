// src/pages/campaigns/CampaignsMainPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";


const CampaignsMainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pl-6 max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">📢 Campaigns</h2>
      <p className="text-gray-600 mb-8">
        Manage and analyze your marketing campaigns with AI-powered tools.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Campaign Card */}
        <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3">🚀 Create Campaign</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>Define campaign rules (Lifetime Spend, Total Orders, etc.)</li>
            <li>Use AI to generate rules automatically</li>
            <li>Get AI-powered message suggestions</li>
            <li>Preview audience size before launch</li>
            <li>Choose Immediate or Scheduled delivery</li>
          </ul>
          <button
            onClick={() => navigate("/campaigns/create")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            ➕ Create Campaign
          </button>
        </div>

        {/* Campaign History Card */}
        <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3">📜 Campaign History</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>View past campaigns with details</li>
            <li>Check delivery stats (Sent, Failed, Audience size)</li>
            <li>See campaign status and created time</li>
            <li>AI-generated campaign tags</li>
            <li>Generate AI-powered insights per campaign</li>
          </ul>
          <button
            onClick={() => navigate("/campaigns/history")}
            className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            📊 View History
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignsMainPage;
