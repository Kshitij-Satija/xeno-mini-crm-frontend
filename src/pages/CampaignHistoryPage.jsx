import React, { useEffect, useState } from "react";
import API from "../api/API";
import NotificationModal from "../components/NotificationModal";
import SkeletonRow from "../components/campaigns/history/SkeletonRow";
import CampaignRow from "../components/campaigns/history/CampaignRow";

const CampaignHistoryPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [insights, setInsights] = useState({});
  const [loadingInsight, setLoadingInsight] = useState({});

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await API.get("/campaigns");
      setCampaigns(res.data.campaigns || []);
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Failed to fetch campaigns" });
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const generateInsight = async (campaign) => {
    try {
      setLoadingInsight((prev) => ({ ...prev, [campaign._id]: true }));

      const res = await API.post("/campaigns/ai/insight", {
        campaignId: campaign._id,
      });

      setInsights((prev) => ({
        ...prev,
        [campaign._id]: res.data.insight || "No insight available.",
      }));
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Failed to generate insight" });
    } finally {
      setLoadingInsight((prev) => ({ ...prev, [campaign._id]: false }));
    }
  };

  return (
    <div className="pl-6 max-w-7xl mx-auto p-6">
      <NotificationModal
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification({ type: "", message: "" })}
      />

      <h2 className="text-2xl font-bold mb-4">Campaign History</h2>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Message</th>
            <th className="border px-2 py-1">Delivery Mode</th>
            <th className="border px-2 py-1">Scheduled At</th>
            <th className="border px-2 py-1">Audience Size</th>
            <th className="border px-2 py-1">Sent</th>
            <th className="border px-2 py-1">Failed</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">AI Tags</th>
            <th className="border px-2 py-1">Created At</th>
            <th className="border px-2 py-1">Insight</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            : campaigns.length === 0
            ? (
              <tr>
                <td colSpan={11} className="border px-2 py-1 text-center">
                  No campaigns yet.
                </td>
              </tr>
            )
            : campaigns.map((c) => (
                <CampaignRow
                  key={c._id}
                  campaign={c}
                  generateInsight={generateInsight}
                  loadingInsight={loadingInsight}
                  insight={insights[c._id]}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignHistoryPage;
