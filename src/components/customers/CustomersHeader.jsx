import React from "react";

const CustomersHeader = ({ onAdd, onBulk, onRefresh }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold">Customers</h2>
    <div className="flex gap-3">
      <button
        onClick={onAdd}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        ➕ Add Customer
      </button>
      <button
        onClick={onBulk}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        📂 Bulk Upload
      </button>
      <button
        onClick={onRefresh}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        🔄 Refresh
      </button>
    </div>
  </div>
);

export default CustomersHeader;
