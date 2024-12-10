import React, { useState, useEffect } from "react";
import { BacklogItem, BacklogItemType } from "./components/BacklogItem";
import { StatCard } from "./components/StatCard";
import { ClarityModal } from "./components/ClarityModal";
import { useBacklogIssues } from "./hooks/useBacklogIssues";
import { LoginPage } from "./components/LoginPage";
import { ApiClient } from "./api/client";
import { User } from "./api/types";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const { data: issues, loading, error } = useBacklogIssues();
  const [selectedItem, setSelectedItem] = useState<BacklogItemType | null>(
    null
  );

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await ApiClient.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  };

  const handleLoginSuccess = () => {
    checkAuth();
  };

  const handleLogout = async () => {
    try {
      await ApiClient.logout();
      setUser(null);
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  // Convert API clarity scores (1-5) to our UI states (unclear, almost clear, clear)
  const mapClarityScore = (
    score: number
  ): "unclear" | "almost clear" | "clear" => {
    if (score <= 2) return "unclear";
    if (score <= 4) return "almost clear";
    return "clear";
  };

  const backlogItems: BacklogItemType[] =
    issues?.map((issue) => ({
      id: issue.id,
      title: issue.title,
      devClarity: mapClarityScore(issue.developer_clarity),
      businessClarity: mapClarityScore(issue.business_value_clarity),
      validation: mapClarityScore(issue.customer_validation),
    })) ?? [];

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
    // TODO: Implement API update
    setSelectedItem(null);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Backlog Clarity Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user.username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
          </div>
        </div>

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
