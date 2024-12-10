import React, { useState } from "react";
import { XCircle, CheckCircle } from "lucide-react";
import { BacklogItemType } from "./BacklogItem";

export const ClarityModal: React.FC<{
  item: BacklogItemType;
  onClose: () => void;
  onUpdate: (item: BacklogItemType) => void;
}> = ({ item, onClose, onUpdate }) => {
  const [updatedItem, setUpdatedItem] = useState(item);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: keyof BacklogItemType, value: string) => {
    setUpdatedItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      onUpdate(updatedItem);
    }, 1500); // Delay to show success message
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        {showSuccess ? (
          <div className="text-center">
            <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Clarity Updated!</h2>
            <p className="text-gray-600">Great job improving your backlog!</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Improve Clarity</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-semibold">
                    Dev Clarity
                  </label>
                  <select
                    value={updatedItem.devClarity}
                    onChange={(e) =>
                      handleChange(
                        "devClarity",
                        e.target.value as "clear" | "almost clear" | "unclear"
                      )
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="clear">Clear</option>
                    <option value="almost clear">Almost Clear</option>
                    <option value="unclear">Unclear</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-semibold">
                    Business Clarity
                  </label>
                  <select
                    value={updatedItem.businessClarity}
                    onChange={(e) =>
                      handleChange(
                        "businessClarity",
                        e.target.value as "clear" | "almost clear" | "unclear"
                      )
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="clear">Clear</option>
                    <option value="almost clear">Almost Clear</option>
                    <option value="unclear">Unclear</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Validation</label>
                  <select
                    value={updatedItem.validation}
                    onChange={(e) =>
                      handleChange(
                        "validation",
                        e.target.value as "clear" | "almost clear" | "unclear"
                      )
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="clear">Clear</option>
                    <option value="almost clear">Almost Clear</option>
                    <option value="unclear">Unclear</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Update Clarity
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
