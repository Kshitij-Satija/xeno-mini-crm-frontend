import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/API";

import NotificationModal from "../components/NotificationModal";

import RuleBlock from "../components/campaigns/create/RuleBlock";
import AiRuleModal from "../components/campaigns/create/AiRuleModal";
import MessageBox from "../components/campaigns/create/MessageBox";
import CampaignHeader from "../components/campaigns/create/CampaignHeader";

const CampaignCreationPage = () => {
  const navigate = useNavigate();

  // States
  const [campaignName, setCampaignName] = useState("");
  const [rules, setRules] = useState([{ field: "lifetimeSpend", operator: ">", value: 0 }]);
  const [logic, setLogic] = useState("AND");
  const [message, setMessage] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("IMMEDIATE");
  const [scheduledAt, setScheduledAt] = useState("");
  const [audienceSize, setAudienceSize] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [creating, setCreating] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });

  // AI Rule Modal
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const aiButtonRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  // Suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestButtonRef = useRef(null);
  const [suggestLoading, setSuggestLoading] = useState(false);

  // Rule handlers
  const addRule = () => setRules([...rules, { field: "totalOrders", operator: ">", value: 0 }]);
  const removeRule = (i) => setRules(rules.filter((_, idx) => idx !== i));
  const handleRuleChange = (i, key, value) => {
    const newRules = [...rules];
    newRules[i][key] = key === "value" ? Number(value) : value;
    setRules(newRules);
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: "", message: "" }), 3000);
  };

  // Preview
  const previewAudience = async () => {
    try {
      setLoadingPreview(true);
      const res = await API.post("/campaigns/preview", { rules: { logic, rules } });
      setAudienceSize(res.data.audienceSize);
      showNotification("success", "Audience preview loaded!");
    } catch {
      showNotification("error", "Failed to preview audience");
    } finally {
      setLoadingPreview(false);
    }
  };

  // Create Campaign
  const createCampaign = async () => {
    if (!campaignName.trim()) return showNotification("error", "Campaign name is required");
    if (rules.length === 0) return showNotification("error", "At least one rule is required");
    if (!message.trim()) return showNotification("error", "Message is required");
    if (deliveryMode === "SCHEDULED" && !scheduledAt)
      return showNotification("error", "Scheduled date/time is required");

    try {
      setCreating(true);
      await API.post("/campaigns", {
        campaignName,
        rules: { logic, rules },
        message,
        deliveryMode,
        scheduledAt: deliveryMode === "SCHEDULED" ? new Date(scheduledAt) : null,
      });
      showNotification("success", "Campaign queued successfully!");
      setCampaignName("");
      setRules([{ field: "lifetimeSpend", operator: ">", value: 0 }]);
      setMessage("");
      setAudienceSize(null);
      setDeliveryMode("IMMEDIATE");
      setScheduledAt("");
      setAiPrompt("");
      setTimeout(() => navigate("/campaigns/history"), 1000);
    } catch {
      showNotification("error", "Failed to create campaign");
    } finally {
      setCreating(false);
    }
  };

  // AI Parse
  const parseAiPrompt = async () => {
    if (!aiPrompt.trim()) return showNotification("error", "Please enter a description for AI");
    try {
      setAiLoading(true);
      const res = await API.post("/campaigns/ai/parse-segment", { prompt: aiPrompt });
      const aiRules = res.data.rules;
      if (aiRules?.rules?.length) {
        setLogic(aiRules.logic || "AND");
        setRules(aiRules.rules.map((r) => ({ field: r.field, operator: r.operator, value: r.value })));
        showNotification("success", "Rules generated from AI!");
        setShowAiModal(false);
      } else {
        showNotification("error", "AI returned no rules");
      }
    } catch {
      showNotification("error", "Failed to generate rules from AI");
    } finally {
      setAiLoading(false);
    }
  };

  // Suggestions
  const getMessageSuggestions = async () => {
    if (!message.trim()) return showNotification("error", "Please enter a campaign objective first");
    try {
      setSuggestLoading(true);
      const res = await API.post("/campaigns/ai/message-suggestions", { objective: message });
      setSuggestions(res.data.messages || []);
      setShowSuggestions(true);
    } catch {
      showNotification("error", "Failed to get message suggestions");
    } finally {
      setSuggestLoading(false);
    }
  };

  const selectSuggestion = (text) => {
    setMessage(text);
    setShowSuggestions(false);
  };

  // Positioning modal
  useEffect(() => {
    if (aiButtonRef.current) {
      const rect = aiButtonRef.current.getBoundingClientRect();
      setModalPosition({ top: rect.bottom + window.scrollY + 5, left: rect.left + window.scrollX });
    }
  }, [showAiModal]);

  return (
    <div className="pl-6 max-w-7xl mx-auto relative">
      <NotificationModal {...notification} onClose={() => setNotification({ type: "", message: "" })} />

      <CampaignHeader
        aiButtonRef={aiButtonRef}
        onAiClick={() => setShowAiModal((p) => !p)}
        onPreview={previewAudience}
        onHistory={() => navigate("/campaigns/history")}
        loadingPreview={loadingPreview}
      />

      {audienceSize !== null && <p className="mb-4 text-sm text-gray-600 font-medium">Audience Size: {audienceSize}</p>}

      {showAiModal && (
        <AiRuleModal
          modalPosition={modalPosition}
          aiPrompt={aiPrompt}
          setAiPrompt={setAiPrompt}
          aiLoading={aiLoading}
          parseAiPrompt={parseAiPrompt}
          onClose={() => setShowAiModal(false)}
        />
      )}

      {/* Campaign Form */}
      <div className="space-y-6 bg-white border rounded-lg shadow-sm p-6">
        {/* Campaign Info */}
        <div className="space-y-4">
          <div>
            <label className="font-semibold mb-1 block">Campaign Name</label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="border p-2 w-full rounded"
              placeholder="Optional"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="font-semibold">Logic</label>
            <select value={logic} onChange={(e) => setLogic(e.target.value)} className="border p-2 rounded">
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          </div>
        </div>

        {/* Rules + Message */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">Rules</h3>
            {rules.map((r, i) => (
              <RuleBlock key={i} index={i} rule={r} onChange={handleRuleChange} onRemove={removeRule} />
            ))}
            <button onClick={addRule} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              + Add Rule
            </button>
          </div>

          <MessageBox
            message={message}
            setMessage={setMessage}
            showSuggestions={showSuggestions}
            suggestions={suggestions}
            selectSuggestion={selectSuggestion}
            getMessageSuggestions={getMessageSuggestions}
            suggestLoading={suggestLoading}
            suggestButtonRef={suggestButtonRef}
          />
        </div>

        {/* Delivery Mode */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="font-semibold">Delivery Mode</label>
            <select value={deliveryMode} onChange={(e) => setDeliveryMode(e.target.value)} className="border p-2 rounded">
              <option value="IMMEDIATE">Immediate</option>
              <option value="SCHEDULED">Scheduled</option>
            </select>
          </div>

          {deliveryMode === "SCHEDULED" && (
            <div>
              <label className="font-semibold mb-1 block">Scheduled Date & Time</label>
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
  onClick={createCampaign}
  disabled={creating}
  style={{
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#171717",
    padding: "0.7em 1.5em",
    border: "none",
    borderRadius: "0.6rem",
    position: "relative",
    cursor: creating ? "not-allowed" : "pointer",
    overflow: "hidden",
    fontSize: "0.875rem",
    opacity: creating ? 0.6 : 1,
  }}
  onMouseEnter={(e) => {
    if (creating) return;
    const circles = e.currentTarget.querySelectorAll("span.circle");
    circles.forEach((c) => {
      c.style.transform = "translate(-50%, -50%) scale(4)";
      c.style.transition = "1.5s ease";
    });
  }}
  onMouseLeave={(e) => {
    const positions = [
      "-3.3em, -4em",
      "-6em, 1.3em",
      "-0.2em, 1.8em",
      "3.5em, 1.4em",
      "3.5em, -3.8em",
    ];
    const circles = e.currentTarget.querySelectorAll("span.circle");
    circles.forEach((c, i) => {
      c.style.transform = `translate(${positions[i]})`;
      c.style.transition = "0.6s ease";
    });
  }}
>
  <span
    className="circle"
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-3.3em, -4em)",
      height: "30px",
      width: "30px",
      backgroundColor: "#0c66ed",
      borderRadius: "50%",
      transition: "0.6s ease",
    }}
  ></span>
  <span
    className="circle"
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-6em, 1.3em)",
      height: "30px",
      width: "30px",
      backgroundColor: "#0c66ed",
      borderRadius: "50%",
      transition: "0.6s ease",
    }}
  ></span>
  <span
    className="circle"
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-0.2em, 1.8em)",
      height: "30px",
      width: "30px",
      backgroundColor: "#0c66ed",
      borderRadius: "50%",
      transition: "0.6s ease",
    }}
  ></span>
  <span
    className="circle"
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(3.5em, 1.4em)",
      height: "30px",
      width: "30px",
      backgroundColor: "#0c66ed",
      borderRadius: "50%",
      transition: "0.6s ease",
    }}
  ></span>
  <span
    className="circle"
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(3.5em, -3.8em)",
      height: "30px",
      width: "30px",
      backgroundColor: "#0c66ed",
      borderRadius: "50%",
      transition: "0.6s ease",
    }}
  ></span>

  <span
    className="text"
    style={{
      position: "relative",
      zIndex: 10,
    }}
  >
    {creating ? "Creating..." : "🚀 Create"}
  </span>
</button>

        </div>
      </div>
    </div>
  );
};

export default CampaignCreationPage;
