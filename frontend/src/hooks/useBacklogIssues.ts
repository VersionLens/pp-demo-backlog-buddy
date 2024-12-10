import { useState, useEffect } from "react";
import { ApiClient } from "../api/client";
import { ApiResponse, BacklogIssue } from "../api/types";

export const useBacklogIssues = (): ApiResponse<BacklogIssue[]> => {
  const [state, setState] = useState<ApiResponse<BacklogIssue[]>>({
    loading: true,
  });

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await ApiClient.getIssues();
        setState({ data, loading: false });
      } catch (error) {
        console.error("Error fetching issues:", error);
        setState({
          error:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
          loading: false,
        });
      }
    };

    fetchIssues();
  }, []);

  return state;
};
