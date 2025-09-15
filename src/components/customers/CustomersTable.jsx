import React from "react";

const CustomersTable = ({
  customers,
  editingCustomer,
  editForm,
  handleChange,
  handleEditClick,
  handleUpdateCustomer,
  handleDeleteCustomer,
  setEditingCustomer,
}) => {
  if (!customers.length) {
    return <p className="text-gray-500 text-center py-6">No customers found.</p>;
  }

  return (
    <table className="min-w-full table-auto border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-2 py-1">ID</th>
          <th className="border px-2 py-1">Name</th>
          <th className="border px-2 py-1">Email</th>
          <th className="border px-2 py-1">Phone</th>
          <th className="border px-2 py-1">DOB</th>
          <th className="border px-2 py-1">Gender</th>
          <th className="border px-2 py-1">Location</th>
          <th className="border px-2 py-1">Total Orders</th>
          <th className="border px-2 py-1">Lifetime Spend</th>
          <th className="border px-2 py-1">Last Order Date</th>
          <th className="border px-2 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c) => (
          <tr key={c.customerId} className="hover:bg-gray-50">
            <td className="border px-2 py-1">{c.customerId}</td>
            <td className="border px-2 py-1">
              {editingCustomer === c.customerId ? (
                <input
                  name="name"
                  value={editForm.name}
                  onChange={(e) => handleChange(e, true)}
                  className="border px-2 py-1 rounded-md w-full"
                />
              ) : (
                c.name
              )}
            </td>
            <td className="border px-2 py-1">
              {editingCustomer === c.customerId ? (
                <input
                  name="email"
                  value={editForm.email}
                  onChange={(e) => handleChange(e, true)}
                  className="border px-2 py-1 rounded-md w-full"
                />
              ) : (
                c.email
              )}
            </td>
            <td className="border px-2 py-1">
              {editingCustomer === c.customerId ? (
                <input
                  name="phone"
                  value={editForm.phone}
                  onChange={(e) => handleChange(e, true)}
                  className="border px-2 py-1 rounded-md w-full"
                />
              ) : (
                c.phone
              )}
            </td>
            <td className="border px-2 py-1">
              {editingCustomer === c.customerId ? (
                <input
                  type="date"
                  name="dob"
                  value={editForm.dob}
                  onChange={(e) => handleChange(e, true)}
                  className="border px-2 py-1 rounded-md w-full"
                />
              ) : (
                c.metadata?.dob ? new Date(c.metadata.dob).toLocaleDateString() : ""
              )}
            </td>
            <td className="border px-2 py-1">
              {editingCustomer === c.customerId ? (
                <select
                  name="gender"
                  value={editForm.gender}
                  onChange={(e) => handleChange(e, true)}
                  className="border px-2 py-1 rounded-md w-full"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                c.metadata?.gender || ""
              )}
            </td>
            <td className="border px-2 py-1">
              {editingCustomer === c.customerId ? (
                <input
                  name="location"
                  value={editForm.location}
                  onChange={(e) => handleChange(e, true)}
                  className="border px-2 py-1 rounded-md w-full"
                />
              ) : (
                c.metadata?.location || ""
              )}
            </td>
            <td className="border px-2 py-1">{c.totalOrders}</td>
            <td className="border px-2 py-1">{c.lifetimeSpend}</td>
            <td className="border px-2 py-1">
              {c.lastOrderDate ? new Date(c.lastOrderDate).toLocaleDateString() : ""}
            </td>
            <td className="border px-2 py-1 flex gap-2">
              {editingCustomer === c.customerId ? (
                <>
                  <button
                    onClick={handleUpdateCustomer}
                    className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCustomer(null)}
                    className="px-2 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(c)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                 
                  <button
                    onClick={() => handleDeleteCustomer(c.customerId)}
                    className="group relative flex h-10 w-10 flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-red-800 bg-red-400 hover:bg-red-600"
                    >
                    {/* Lid animation */}
                    <svg
                        viewBox="0 0 1.625 1.625"
                        className="absolute -top-5 fill-white delay-100 group-hover:top-3 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                        height="11"
                        width="11"
                    >
                        <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195" />
                        <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033" />
                        <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016" />
                    </svg>

                    {/* Handle */}
                    <svg
                        width="12"
                        fill="none"
                        viewBox="0 0 39 7"
                        className="origin-right duration-500 group-hover:rotate-90"
                    >
                        <line strokeWidth="3" stroke="white" y2="5" x2="39" y1="5" />
                        <line strokeWidth="2" stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1="12" />
                    </svg>

                    {/* Trash can */}
                    <svg width="12" fill="none" viewBox="0 0 33 39">
                        <mask fill="white" id="path-1-inside-1_8_19">
                        <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
                        </mask>
                        <path
                        mask="url(#path-1-inside-1_8_19)"
                        fill="white"
                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                        />
                        <path strokeWidth="3" stroke="white" d="M12 6L12 29" />
                        <path strokeWidth="3" stroke="white" d="M21 6V29" />
                    </svg>
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

export default CustomersTable;
