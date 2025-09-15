import React from "react";

const AddOrderModal = ({
  customerSearch,
  setCustomerSearch,
  searchResults,
  showDropdown,
  setCustomerId,
  setShowDropdown,
  amount,
  setAmount,
  onClose,
  onSubmit,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg space-y-4">
      <h3 className="text-lg font-semibold">Add Order</h3>

      <div className="relative">
        <input
          type="text"
          placeholder="Search Customer by ID or Name"
          value={customerSearch}
          onChange={(e) => setCustomerSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
        {showDropdown && searchResults.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border rounded shadow max-h-40 overflow-y-auto z-10">
            {searchResults.map((cust) => (
              <li
                key={cust._id}
                onClick={() => {
                  setCustomerId(cust.customerId);
                  setCustomerSearch(
                    `${cust.customerId} - ${cust.name || "Unnamed"}`
                  );
                  setShowDropdown(false);
                }}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {cust.customerId} – {cust.name} ({cust.email || "no email"})
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border px-3 py-2 rounded-md w-full"
      />

      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>
    </div>
  </div>
);

export default AddOrderModal;
