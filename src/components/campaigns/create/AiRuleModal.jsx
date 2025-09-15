import React from "react";

const AiRuleModal = ({ modalPosition, aiPrompt, setAiPrompt, aiLoading, parseAiPrompt, onClose }) => (
  <div
    className="absolute bg-white border rounded shadow-lg p-4 w-96 z-50"
    style={{ top: modalPosition.top, left: modalPosition.left }}
  >
    <label className="font-semibold mb-2 block">Describe your audience</label>
    <input
      type="text"
      value={aiPrompt}
      onChange={(e) => setAiPrompt(e.target.value)}
      className="border p-2 w-full rounded mb-2"
      placeholder="E.g., Customers who haven't ordered in 90 days"
    />
    <div className="flex justify-end gap-2">
      <button
        onClick={parseAiPrompt}
        disabled={aiLoading}
        style={{
            border: "none",
            width: "10em",        // smaller width
            height: "2.9em",      // smaller height
            borderRadius: "1.5em", // smaller border-radius
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "6px",            // smaller gap
            background: "#1C1A1C",
            cursor: aiLoading ? "not-allowed" : "pointer",
            transition: "all 300ms ease-in-out",
            fontSize: "0.875rem",  // smaller text
            opacity: aiLoading ? 0.6 : 1,
        }}
        onMouseEnter={(e) => {
            if (aiLoading) return;
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
            {aiLoading ? "Generating..." : "Generate"}
        </span>
      </button>

      <button
        onClick={onClose}
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default AiRuleModal;
