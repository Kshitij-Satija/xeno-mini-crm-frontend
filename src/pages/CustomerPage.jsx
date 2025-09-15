import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import API from "../api/API";

import CustomersSkeleton from "../components/customers/CustomersSkeleton";
import CustomersHeader from "../components/customers/CustomersHeader";
import CustomersTable from "../components/customers/CustomersTable";
import AddCustomerModal from "../components/customers/AddCustomerModal";
import BulkUploadModal from "../components/customers/BulkUploadModal";
import NotificationModal from "../components/NotificationModal"; // import

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Notification state
  const [notification, setNotification] = useState({
    message: "",
    type: "success", // "success" or "error"
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    location: "",
  });

  const [bulkData, setBulkData] = useState([]);
  const [preview, setPreview] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isBulkModalOpen, setBulkModalOpen] = useState(false);

  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    location: "",
  });

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      showNotification("Error fetching customers", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const handleChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) setEditForm((prev) => ({ ...prev, [name]: value }));
    else setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = async () => {
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        metadata: {
          dob: form.dob ? new Date(form.dob) : undefined,
          gender: form.gender,
          location: form.location,
        },
      };
      const res = await API.post("/customers", payload);
      showNotification(res.data.message || "Customer added", "success");
      setForm({ name: "", email: "", phone: "", dob: "", gender: "Male", location: "" });
      setAddModalOpen(false);
      await fetchCustomers();
    } catch (err) {
      console.error(err);
      showNotification("Error adding customer", "error");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data.map((row) => {
          const normalized = {};
          Object.keys(row).forEach((k) => {
            normalized[k.trim().toLowerCase()] = row[k];
          });
          return {
            name: normalized.name,
            email: normalized.email,
            phone: normalized.phone,
            metadata: {
              dob: normalized.dob ? new Date(normalized.dob) : undefined,
              gender: normalized.gender || "Male",
              location: normalized.location || "",
            },
          };
        });
        setBulkData(rows);
        setPreview(results.data.slice(0, 5));
      },
      error: (err) => {
        console.error("CSV parse error:", err);
        showNotification("Error parsing CSV", "error");
      },
    });
  };

  const handleBulkSubmit = async () => {
    if (!bulkData.length) {
      showNotification("No data to upload", "error");
      return;
    }
    try {
      const res = await API.post("/customers/bulk", { customers: bulkData });
      showNotification(res.data.message || "Bulk insert successful", "success");
      setBulkData([]);
      setPreview([]);
      setBulkModalOpen(false);
      await fetchCustomers();
    } catch (err) {
      console.error(err);
      showNotification("Error during bulk insert", "error");
    }
  };

  const handleUpdateCustomer = async () => {
    try {
      const payload = {
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        metadata: {
          dob: editForm.dob ? new Date(editForm.dob) : undefined,
          gender: editForm.gender,
          location: editForm.location,
        },
      };
      const res = await API.put(`/customers/${editingCustomer}`, payload);
      showNotification(res.data.message || "Customer updated", "success");
      setEditingCustomer(null);
      await fetchCustomers();
    } catch (err) {
      console.error(err);
      showNotification("Error updating customer", "error");
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      const res = await API.delete(`/customers/${customerId}`);
      showNotification(res.data.message || "Customer deleted", "success");
      await fetchCustomers();
    } catch (err) {
      console.error(err);
      showNotification("Error deleting customer", "error");
    }
  };

  const backdropClickClose = (e, setter) => {
    if (e.target === e.currentTarget) setter(false);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setAddModalOpen(false);
        setBulkModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <CustomersHeader
        onAdd={() => setAddModalOpen(true)}
        onBulk={() => setBulkModalOpen(true)}
        onRefresh={fetchCustomers}
      />

      {/* Notification */}
      {notification.message && (
        <NotificationModal
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "success" })}
        />
      )}

      {isAddModalOpen && (
        <AddCustomerModal
          form={form}
          handleChange={handleChange}
          handleAddCustomer={handleAddCustomer}
          onClose={() => setAddModalOpen(false)}
          backdropClickClose={backdropClickClose}
        />
      )}

      {isBulkModalOpen && (
        <BulkUploadModal
          preview={preview}
          handleFileUpload={handleFileUpload}
          handleBulkSubmit={handleBulkSubmit}
          onClose={() => setBulkModalOpen(false)}
          backdropClickClose={backdropClickClose}
        />
      )}

      <div className="overflow-x-auto bg-white border rounded-lg shadow-sm p-4 mt-6">
        {loading ? (
          <CustomersSkeleton columns={11} rows={5} />
        ) : (
          <CustomersTable
            customers={customers}
            editingCustomer={editingCustomer}
            editForm={editForm}
            handleChange={handleChange}
            handleEditClick={(customer) => {
              setEditingCustomer(customer.customerId);
              setEditForm({
                name: customer.name || "",
                email: customer.email || "",
                phone: customer.phone || "",
                dob: customer.metadata?.dob
                  ? new Date(customer.metadata.dob).toISOString().slice(0, 10)
                  : "",
                gender: customer.metadata?.gender || "Male",
                location: customer.metadata?.location || "",
              });
            }}
            handleUpdateCustomer={handleUpdateCustomer}
            handleDeleteCustomer={handleDeleteCustomer}
            setEditingCustomer={setEditingCustomer}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
