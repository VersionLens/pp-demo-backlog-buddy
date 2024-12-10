import React, { useState } from "react";
import { BacklogItem, BacklogItemType } from "./components/BacklogItem";
import { StatCard } from "./components/StatCard";
import { ClarityModal } from "./components/ClarityModal";

// Sample data
const sampleBacklogItems: BacklogItemType[] = [
  {
    id: 1,
    title: "Implement user authentication",
    devClarity: "clear",
    businessClarity: "almost clear",
    validation: "unclear",
  },
  {
    id: 2,
    title: "Add dashboard analytics",
    devClarity: "unclear",
    businessClarity: "clear",
    validation: "almost clear",
  },
  {
    id: 3,
    title: "Optimize database queries",
    devClarity: "almost clear",
    businessClarity: "unclear",
    validation: "clear",
  },
];

function App() {
  const [backlogItems, setBacklogItems] =
    useState<BacklogItemType[]>(sampleBacklogItems);
  const [selectedItem, setSelectedItem] = useState<BacklogItemType | null>(
    null
  );

  // Define a type for the keys of the stats object
  type ClarityField = "devClarity" | "businessClarity" | "validation";

  // Calculate stats
  const stats = backlogItems.reduce(
    (acc, item) => {
      (
        ["devClarity", "businessClarity", "validation"] as ClarityField[]
      ).forEach((field) => {
        const value = item[field];
        if (value === "clear") acc[field].clear++;
        else if (value === "almost clear") acc[field].almostClear++;
        else if (value === "unclear") acc[field].unclear++;
      });
      return acc;
    },
    {
      devClarity: { clear: 0, almostClear: 0, unclear: 0 },
      businessClarity: { clear: 0, almostClear: 0, unclear: 0 },
      validation: { clear: 0, almostClear: 0, unclear: 0 },
    }
  );

  const handleUpdateClarity = (updatedItem: BacklogItemType) => {
    setBacklogItems((items) =>
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Backlog Clarity Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Development Clarity"
            clear={stats.devClarity.clear}
            almostClear={stats.devClarity.almostClear}
            unclear={stats.devClarity.unclear}
          />
          <StatCard
            title="Business Clarity"
            clear={stats.businessClarity.clear}
            almostClear={stats.businessClarity.almostClear}
            unclear={stats.businessClarity.unclear}
          />
          <StatCard
            title="Validation Status"
            clear={stats.validation.clear}
            almostClear={stats.validation.almostClear}
            unclear={stats.validation.unclear}
          />
        </div>

        <div className="space-y-4">
          {backlogItems.map((item) => (
            <BacklogItem
              key={item.id}
              item={item}
              onClarityUpdate={() => setSelectedItem(item)}
            />
          ))}
        </div>

        {selectedItem && (
          <ClarityModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onUpdate={handleUpdateClarity}
          />
        )}
      </div>
    </div>
  );
}

export default App;
