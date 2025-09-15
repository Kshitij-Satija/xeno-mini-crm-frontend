import React from "react";

const CampaignHeader = ({ aiButtonRef, onAiClick, onPreview, onHistory, loadingPreview }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">📢 Create Campaign</h2>
    <div className="flex items-center gap-3">
      <button
        ref={aiButtonRef}
        onClick={onAiClick}
        style={{
            border: "none",
            width: "10em",        // smaller width
            height: "2.9em",     // smaller height
            borderRadius: "1.5em", // smaller border-radius
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "6px",           // smaller gap between icon and text
            background: "#1C1A1C",
            cursor: "pointer",
            transition: "all 300ms ease-in-out",
            fontSize: "0.875rem", // match text size
        }}
        onMouseEnter={(e) => {
        e.currentTarget.style.background = "linear-gradient(0deg,#A47CF3,#683FEA)";
        e.currentTarget.style.boxShadow =
            "inset 0px 1px 0px 0px rgba(255, 255, 255, 0.2), inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(255, 255, 255, 0.1), 0px 0px 40px 0px #9917FF";
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
            style={{
            transition: "all 300ms ease",
            }}
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
            Generate Rules
        </span>
      </button>


      <button
        onClick={onPreview}
        disabled={loadingPreview}
        style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            margin: "0 auto",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            fontWeight: 600,
            color: loadingPreview ? "#9CA3AF" : "#1F2937", // gray-50 text fallback
            backgroundColor: "#F9FAFB", // bg-gray-50
            border: "2px solid #F9FAFB",
            borderRadius: "9999px",
            overflow: "hidden",
            cursor: loadingPreview ? "not-allowed" : "pointer",
            backdropFilter: "blur(10px)",
            transition: "all 0.7s ease",
        }}
        onMouseEnter={(e) => {
            if (loadingPreview) return;
            const btn = e.currentTarget;
            btn.style.color = "#F9FAFB";
            btn.style.borderColor = "#10B981"; // emerald-500
            const before = btn.querySelector(".hover-bg");
            if (before) {
            before.style.left = "0";
            before.style.transform = "scale(1.5)";
            }
            const svg = btn.querySelector("svg");
            if (svg) {
            svg.style.transform = "rotate(90deg)";
            }
        }}
        onMouseLeave={(e) => {
            const btn = e.currentTarget;
            btn.style.color = "#1F2937";
            btn.style.borderColor = "#F9FAFB";
            const before = btn.querySelector(".hover-bg");
            if (before) {
            before.style.left = "-100%";
            before.style.transform = "scale(1)";
            }
            const svg = btn.querySelector("svg");
            if (svg) svg.style.transform = "rotate(45deg)";
        }}
        >
        {/* Hover background effect */}
        <span
            className="hover-bg"
            style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            backgroundColor: "#10B981", // emerald-500
            borderRadius: "9999px",
            zIndex: -10,
            transition: "all 0.7s ease",
            }}
        ></span>

        <span style={{ position: "relative", zIndex: 10 }}>
            {loadingPreview ? "Previewing..." : "👥 Preview Audience"}
        </span>

        <svg
            style={{
            width: "1.5rem",
            height: "1.5rem",
            zIndex: 10,
            transform: "rotate(45deg)",
            transition: "all 0.3s linear",
            }}
            viewBox="0 0 16 19"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
            fill="#1F2937"
            ></path>
        </svg>
      </button>

      <button
        onClick={onHistory}
        style={{
            position: "relative",
            fontSize: "17px",
            textTransform: "uppercase",
            textDecoration: "none",
            padding: "0.5rem 1.25rem", // scaled down to match nearby buttons
            display: "inline-block",
            cursor: "pointer",
            borderRadius: "3em",
            transition: "all 0.2s",
            border: "none",
            fontFamily: "inherit",
            fontWeight: 500,
            color: "black",
            backgroundColor: "white",
            overflow: "hidden",
        }}
        onMouseEnter={(e) => {
            const btn = e.currentTarget;
            btn.style.transform = "translateY(-3px)";
            btn.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
            const after = btn.querySelector(".after");
            if (after) {
            after.style.transform = "scaleX(1.4) scaleY(1.6)";
            after.style.opacity = 0;
            }
        }}
        onMouseLeave={(e) => {
            const btn = e.currentTarget;
            btn.style.transform = "translateY(0px)";
            btn.style.boxShadow = "none";
            const after = btn.querySelector(".after");
            if (after) {
            after.style.transform = "scaleX(1) scaleY(1)";
            after.style.opacity = 1;
            }
        }}
        onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 5px 10px rgba(0,0,0,0.2)";
        }}
        onMouseUp={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow = "none";
        }}
        >
        {/* Hover/active background effect */}
        <span
            className="after"
            style={{
            content: '""',
            display: "inline-block",
            height: "100%",
            width: "100%",
            borderRadius: "100px",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            transition: "all 0.4s",
            backgroundColor: "#fff",
            }}
        ></span>

        <span style={{ position: "relative", zIndex: 1 }}>📜 History</span>
      </button>

    </div>
  </div>
);

export default CampaignHeader;
