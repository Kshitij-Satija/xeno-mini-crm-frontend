// components/NotificationModal.jsx
import React, { useEffect } from "react";

const NotificationModal = ({ type = "success", message = "", onClose, autoClose = 3000 }) => {
  useEffect(() => {
    if (!message) return;
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [message, onClose, autoClose]);

  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="bg-white rounded-lg shadow-xl p-6 relative w-96 flex flex-col items-center animate-fadeInScale"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          ✕
        </button>

        {/* Icon */}
        <div
        className={`text-5xl mb-4 ${
            type === "success"
            ? "text-green-500 animate-bounce"
            : "text-red-500 animate-shake"
        }`}
        >
        {type === "success" ? "✓" : "✕"}
        </div>

        {/* Message */}
        <p className="text-center text-gray-800">{message}</p>

        {/* Styles */}
        <style jsx>{`
          @keyframes fadeInScale {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-fadeInScale {
            animation: fadeInScale 0.3s ease-out forwards;
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            50% { transform: translateX(8px); }
            75% { transform: translateX(-8px); }
          }
          .animate-shake {
            animation: shake 0.4s ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default NotificationModal;
