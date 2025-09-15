import React from "react";

const CampaignRow = ({
  campaign,
  generateInsight,
  loadingInsight,
  insight,
}) => {
  return (
    <React.Fragment key={campaign._id}>
      <tr className="hover:bg-gray-100">
        <td className="border px-2 py-1">{campaign.campaignName || "-"}</td>
        <td className="border px-2 py-1">{campaign.message}</td>
        <td className="border px-2 py-1">{campaign.deliveryMode}</td>
        <td className="border px-2 py-1">
          {campaign.deliveryMode === "SCHEDULED" && campaign.scheduledAt
            ? new Date(campaign.scheduledAt).toLocaleString()
            : "-"}
        </td>
        <td className="border px-2 py-1">{campaign.stats?.audienceSize ?? 0}</td>
        <td className="border px-2 py-1">{campaign.stats?.sent ?? 0}</td>
        <td
          className={`border px-2 py-1 ${
            campaign.stats?.failed > 0 ? "text-red-600 font-semibold" : ""
          }`}
        >
          {campaign.stats?.failed ?? 0}
        </td>
        <td className="border px-2 py-1">{campaign.status}</td>
        <td className="border px-2 py-1">
          {Array.isArray(campaign.tags)
            ? campaign.tags.join(", ")
            : "Processing tags..."}
        </td>
        <td className="border px-2 py-1">
          {campaign.createdAt
            ? new Date(campaign.createdAt).toLocaleString()
            : "-"}
        </td>
        <td className="border px-2 py-1">
          <button
            onClick={() => generateInsight(campaign)}
            disabled={loadingInsight[campaign._id]}
            style={{
                border: "none",
                width: "10em",
                height: "2.9em",
                borderRadius: "1.5em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "6px",
                background: "#1C1A1C",
                cursor: loadingInsight[campaign._id] ? "not-allowed" : "pointer",
                transition: "all 300ms ease-in-out",
                fontSize: "0.875rem",
                opacity: loadingInsight[campaign._id] ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
                if (loadingInsight[campaign._id]) return;
                e.currentTarget.style.background = "linear-gradient(0deg,#A47CF3,#683FEA)";
                e.currentTarget.style.boxShadow =
                "inset 0px 1px 0px 0px rgba(255,255,255,0.2), inset 0px -1px 0px 0px rgba(0,0,0,0.1), 0px 0px 0px 1px rgba(255,255,255,0.1), 0px 0px 40px 0px #9917FF";
                e.currentTarget.style.transform = "translateY(-0.5px)";
                const text = e.currentTarget.querySelector(".text");
                if (text) text.style.color = "white";
                const sparkle = e.currentTarget.querySelector(".sparkle");
                if (sparkle) {
                sparkle.style.fill = "white";
                sparkle.style.transform = "scale(1)";
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1C1A1C";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0px)";
                const text = e.currentTarget.querySelector(".text");
                if (text) text.style.color = "#AAAAAA";
                const sparkle = e.currentTarget.querySelector(".sparkle");
                if (sparkle) {
                sparkle.style.fill = "#AAAAAA";
                sparkle.style.transform = "scale(0.9)";
                }
            }}
            >
            <svg
                height="16"
                width="16"
                viewBox="0 0 24 24"
                fill="#AAAAAA"
                className="sparkle"
                style={{ transition: "all 300ms ease" }}
            >
                <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
            </svg>

            <span
                className="text"
                style={{
                fontWeight: 600,
                color: "#AAAAAA",
                fontSize: "0.875rem",
                transition: "all 300ms ease-in-out",
                }}
            >
                {loadingInsight[campaign._id] ? "Generating..." : "Generate Insight"}
            </span>
            </button>

        </td>
      </tr>

      {insight && (
        <tr>
          <td
            colSpan={11}
            className="border px-2 py-1 bg-gray-50 text-gray-700 transition-all duration-300"
          >
            {insight}
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default CampaignRow;
