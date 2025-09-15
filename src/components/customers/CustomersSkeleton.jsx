import React from "react";

const CustomersSkeleton = ({ columns = 11, rows = 5 }) => (
  <table className="min-w-full table-auto border-collapse border border-gray-300">
    <thead className="bg-gray-100">
      <tr>
        {Array.from({ length: columns }).map((_, i) => (
          <th key={i} className="border px-2 py-1">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx}>
          {Array.from({ length: columns }).map((_, colIdx) => (
            <td key={colIdx} className="border px-2 py-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default CustomersSkeleton;
