import React from "react";

const BulkUploadModal = ({
  onClose,
  onFileUpload,
  onSubmit,
  preview,
  bulkData,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg space-y-4">
      <h3 className="text-lg font-semibold">Bulk Upload Orders</h3>
      <input
        type="file"
        accept=".csv"
        onChange={onFileUpload}
        className="border p-2 rounded-md w-full"
      />

      {preview.length > 0 && (
        <div className="overflow-x-auto">
          <p className="mb-2 font-medium">Preview first 5 rows:</p>
          <table className="table-auto border-collapse border border-gray-300 w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(preview[0]).map((col) => (
                  <th key={col} className="border px-2 py-1">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="border px-2 py-1">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={!bulkData.length}
          className={`px-4 py-2 rounded text-white ${
            bulkData.length
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Upload All
        </button>
      </div>
    </div>
  </div>
);

export default BulkUploadModal;
