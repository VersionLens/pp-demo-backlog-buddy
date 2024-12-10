import { BacklogIssue, LoginCredentials, User } from "./types";

const API_BASE_URL = "http://localhost:8000/api";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiClient {
  static async login(credentials: LoginCredentials): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new ApiError(response.status, "Invalid credentials");
    }

    return response.json();
  }

  static async logout(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new ApiError(response.status, "Failed to logout");
    }
  }

  static async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new ApiError(response.status, "Not authenticated");
    }

    return response.json();
  }

  static async getIssues(): Promise<BacklogIssue[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/issues`, {
        credentials: "include",
      });

      if (!response.ok) {
        let errorMessage: string;

        switch (response.status) {
          case 401:
            errorMessage = "You need to be logged in to view issues";
            break;
          case 403:
            errorMessage = "You don't have permission to view these issues";
            break;
          case 404:
            errorMessage = "The issues endpoint was not found";
            break;
          case 500:
            errorMessage =
              "The server encountered an error while fetching issues";
            break;
          default:
            errorMessage = `Failed to fetch issues (HTTP ${response.status})`;
        }

        throw new ApiError(response.status, errorMessage);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Network or other errors
      if (!navigator.onLine) {
        throw new Error(
          "Unable to fetch issues. Please check your internet connection."
        );
      }

      throw new Error(
        "Failed to connect to the server. Please try again later."
      );
    }
  }
}
