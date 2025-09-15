import React from "react";

const SkeletonRow = () => (
  <tr>
    {Array.from({ length: 11 }).map((_, i) => (
      <td key={i} className="border px-2 py-1">
        <div className="h-4 bg-gray-300 rounded animate-pulse w-full" />
      </td>
    ))}
  </tr>
);

export default SkeletonRow;
