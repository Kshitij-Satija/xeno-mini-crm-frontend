import React from "react";

const OrdersSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="flex justify-between items-center">
      <div className="h-8 w-32 bg-gray-300 rounded"></div>
      <div className="h-8 w-24 bg-gray-300 rounded"></div>
    </div>

    <div className="overflow-x-auto bg-white border rounded-lg shadow-sm p-4 space-y-2">
      {Array.from({ length: 3 }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex space-x-2">
          {Array.from({ length: 5 }).map((_, colIdx) => (
            <div key={colIdx} className="h-6 flex-1 bg-gray-200 rounded"></div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default OrdersSkeleton;
