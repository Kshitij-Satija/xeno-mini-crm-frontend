import React from "react";

const BulkUploadModal = ({
  preview,
  handleFileUpload,
  handleBulkSubmit,
  onClose,
  backdropClickClose,
}) => (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={(e) => backdropClickClose(e, onClose)}
  >
    <div className="bg-white p-6 rounded-lg w-[700px] max-h-[80vh] overflow-y-auto shadow-lg relative">
      <h3 className="text-xl font-bold mb-4">Bulk Upload Customers</h3>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="border p-2 rounded-md mb-3 w-full"
      />

      {preview.length > 0 && (
        <>
          <p className="mb-2 font-medium">Preview first 5 rows:</p>
          <div className="overflow-x-auto mb-4">
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  {Object.keys(preview[0]).map((col) => (
                    <th key={col} className="border px-2 py-1">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="border px-2 py-1">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleBulkSubmit}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Upload All
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);

export default BulkUploadModal;
