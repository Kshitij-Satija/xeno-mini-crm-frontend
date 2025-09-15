import React from "react";

const OrdersTable = ({
  orders,
  editingOrder,
  editForm,
  setEditForm,
  setEditingOrder,
  handleEditClick,
  handleUpdateOrder,
  handleDeleteOrder,
}) => {
  if (!orders.length) {
    return <p className="text-gray-500 text-center py-6">No orders found.</p>;
  }

  return (
    <table className="min-w-full table-auto border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-2 py-1">Order ID</th>
          <th className="border px-2 py-1">Customer</th>
          <th className="border px-2 py-1">Amount</th>
          <th className="border px-2 py-1">Status</th>
          <th className="border px-2 py-1">Date</th>
          <th className="border px-2 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.orderId} className="hover:bg-gray-50">
            <td className="border px-2 py-1">{o.orderId}</td>
            <td className="border px-2 py-1">
              {o.customerId?.name || o.customerId || "Unknown"}
            </td>
            <td className="border px-2 py-1">
              {editingOrder === o.orderId ? (
                <input
                  type="number"
                  value={editForm.amount}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, amount: e.target.value }))
                  }
                  className="border px-2 py-1 rounded w-24"
                />
              ) : (
                o.amount
              )}
            </td>
            <td className="border px-2 py-1">
              {editingOrder === o.orderId ? (
                <select
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              ) : (
                o.status
              )}
            </td>
            <td className="border px-2 py-1">
              {new Date(o.date).toLocaleString()}
            </td>
            <td className="border px-2 py-1 space-x-2">
              {editingOrder === o.orderId ? (
                <>
                  <button
                    onClick={handleUpdateOrder}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingOrder(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(o)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(o.orderId)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
