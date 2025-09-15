import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import API from "../api/API";

import OrdersSkeleton from "../components/orders/OrdersSkeleton";
import OrdersHeader from "../components/orders/OrdersHeader";
import OrdersTable from "../components/orders/OrdersTable";
import AddOrderModal from "../components/orders/AddOrderModal";
import BulkUploadModal from "../components/orders/BulkUploadModal";

const OrderPage = () => {
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [amount, setAmount] = useState("");
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const [bulkData, setBulkData] = useState([]);
  const [preview, setPreview] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const [editingOrder, setEditingOrder] = useState(null);
  const [editForm, setEditForm] = useState({ amount: "", status: "PENDING" });

  const debounceRef = useRef(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const searchCustomers = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await API.get(`/customers/search?q=${query}`);
      setSearchResults(res.data);
      setShowDropdown(true);
    } catch (err) {
      console.error("Error searching customers", err);
    }
  };

  useEffect(() => {
    if (!customerSearch) {
      setSearchResults([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(
      () => searchCustomers(customerSearch),
      400
    );
    return () => clearTimeout(debounceRef.current);
  }, [customerSearch]);

  const handleAddOrder = async () => {
    if (!customerId) {
      setMessage("Please select a valid customer");
      return;
    }
    try {
      const res = await API.post("/orders", {
        customerId,
        amount: parseFloat(amount),
      });
      setMessage(res.data.message);
      setCustomerId("");
      setCustomerSearch("");
      setAmount("");
      setShowAddModal(false);
      fetchOrders();
    } catch (err) {
      console.error(err);
      setMessage("Error adding order");
    }
  };

  const handleEditClick = (order) => {
    setEditingOrder(order.orderId);
    setEditForm({ amount: order.amount, status: order.status });
  };

  const handleUpdateOrder = async () => {
    try {
      const res = await API.put(`/orders/${editingOrder}`, {
        amount: parseFloat(editForm.amount),
        status: editForm.status,
      });
      setMessage(res.data.message);
      setEditingOrder(null);
      fetchOrders();
    } catch (err) {
      console.error(err);
      setMessage("Error updating order");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const res = await API.delete(`/orders/${orderId}`);
      setMessage(res.data.message);
      fetchOrders();
    } catch (err) {
      console.error(err);
      setMessage("Error deleting order");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data.map((row) => ({
          customerId: row["Customer ID"] || row["customerId"],
          amount: parseFloat(row["Amount"] || row["amount"] || 0),
          status: row["Status"] || "PENDING",
        }));
        setBulkData(rows);
        setPreview(results.data.slice(0, 5));
      },
    });
  };

  const handleBulkSubmit = async () => {
    if (!bulkData.length) {
      setMessage("No data to upload");
      return;
    }
    try {
      const res = await API.post("/orders/bulk", { orders: bulkData });
      setMessage(res.data.message || "Bulk insert queued");
      setBulkData([]);
      setPreview([]);
      setShowBulkModal(false);
      fetchOrders();
    } catch (err) {
      console.error(err);
      setMessage("Error during bulk insert");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <OrdersHeader
        onAddClick={() => setShowAddModal(true)}
        onBulkClick={() => setShowBulkModal(true)}
        onRefresh={fetchOrders}
      />

      {message && <p className="mb-4 text-red-600 font-medium">{message}</p>}

      {loading ? (
        <OrdersSkeleton />
      ) : (
        <div className="overflow-x-auto bg-white border rounded-lg shadow-sm p-4">
          <OrdersTable
            orders={orders}
            editingOrder={editingOrder}
            editForm={editForm}
            setEditForm={setEditForm}
            setEditingOrder={setEditingOrder}
            handleEditClick={handleEditClick}
            handleUpdateOrder={handleUpdateOrder}
            handleDeleteOrder={handleDeleteOrder}
          />
        </div>
      )}

      {showAddModal && (
        <AddOrderModal
          customerSearch={customerSearch}
          setCustomerSearch={setCustomerSearch}
          searchResults={searchResults}
          showDropdown={showDropdown}
          setCustomerId={setCustomerId}
          setShowDropdown={setShowDropdown}
          amount={amount}
          setAmount={setAmount}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddOrder}
        />
      )}

      {showBulkModal && (
        <BulkUploadModal
          onClose={() => setShowBulkModal(false)}
          onFileUpload={handleFileUpload}
          onSubmit={handleBulkSubmit}
          preview={preview}
          bulkData={bulkData}
        />
      )}
    </div>
  );
};

export default OrderPage;
