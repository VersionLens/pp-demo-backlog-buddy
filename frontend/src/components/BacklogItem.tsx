import React from "react";
import { CheckCircle, AlertCircle, HelpCircle } from "lucide-react";

export type BacklogItemType = {
  id: number;
  title: string;
  devClarity: "clear" | "almost clear" | "unclear";
  businessClarity: "clear" | "almost clear" | "unclear";
  validation: "clear" | "almost clear" | "unclear";
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "clear":
      return <CheckCircle className="text-green-500" />;
    case "almost clear":
      return <AlertCircle className="text-yellow-500" />;
    case "unclear":
      return <HelpCircle className="text-red-500" />;
    default:
      return null;
  }
};

export const BacklogItem: React.FC<{
  item: BacklogItemType;
  onClarityUpdate: () => void;
}> = ({ item, onClarityUpdate }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
      <div className="flex space-x-4">
        <div className="flex items-center">
          <span className="mr-2">Dev:</span>
          {getStatusIcon(item.devClarity)}
        </div>
        <div className="flex items-center">
          <span className="mr-2">Business:</span>
          {getStatusIcon(item.businessClarity)}
        </div>
        <div className="flex items-center">
          <span className="mr-2">Validation:</span>
          {getStatusIcon(item.validation)}
        </div>
      </div>
    </div>
    {(item.devClarity !== "clear" ||
      item.businessClarity !== "clear" ||
      item.validation !== "clear") && (
      <button
        onClick={onClarityUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Improve Clarity
      </button>
    )}
  </div>
);
