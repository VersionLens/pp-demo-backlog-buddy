import React from "react";

export const StatCard: React.FC<{
  title: string;
  clear: number;
  almostClear: number;
  unclear: number;
}> = ({ title, clear, almostClear, unclear }) => {
  const total = clear + almostClear + unclear;
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-green-500">Clear</span>
          <span className="font-bold">
            {Math.round((clear / total) * 100)}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-yellow-500">Almost Clear</span>
          <span className="font-bold">
            {Math.round((almostClear / total) * 100)}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-red-500">Unclear</span>
          <span className="font-bold">
            {Math.round((unclear / total) * 100)}%
          </span>
        </div>
      </div>
      <div className="mt-4 bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
          style={{
            width: "100%",
            background: `linear-gradient(to right, #10B981 0%, #10B981 ${
              (clear / total) * 100
            }%, #FBBF24 ${(clear / total) * 100}%, #FBBF24 ${
              ((clear + almostClear) / total) * 100
            }%, #EF4444 ${
              ((clear + almostClear) / total) * 100
            }%, #EF4444 100%)`,
          }}
        />
      </div>
    </div>
  );
};
