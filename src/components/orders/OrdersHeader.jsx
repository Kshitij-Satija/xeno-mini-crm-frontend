import React from "react";

const OrdersHeader = ({ onAddClick, onBulkClick, onRefresh }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Orders</h2>
      <div className="space-x-3">
        <button
          onClick={onAddClick}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          ➕ Add Order
        </button>
        <button
          onClick={onBulkClick}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          📤 Bulk Upload
        </button>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          🔄 Refresh
        </button>
      </div>
    </div>
  );
};

export default OrdersHeader;
