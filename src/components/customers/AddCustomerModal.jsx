import React from "react";

const AddCustomerModal = ({
  form,
  handleChange,
  handleAddCustomer,
  onClose,
  backdropClickClose,
}) => (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={(e) => backdropClickClose(e, onClose)}
  >
    <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
      <h3 className="text-xl font-bold mb-4">Add Customer</h3>

      <div className="flex flex-col gap-2">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border px-2 py-1 rounded-md w-full"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border px-2 py-1 rounded-md w-full"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border px-2 py-1 rounded-md w-full"
        />
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="border px-2 py-1 rounded-md w-full"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="border px-2 py-1 rounded-md w-full"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border px-2 py-1 rounded-md w-full"
        />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleAddCustomer}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Add
        </button>
      </div>
    </div>
  </div>
);

export default AddCustomerModal;
