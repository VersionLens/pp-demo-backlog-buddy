export interface Team {
  id: number;
  name: string;
  description: string;
}

export interface BacklogIssue {
  id: number;
  team: Team;
  title: string;
  description: string;
  developer_clarity: number;
  business_value_clarity: number;
  customer_validation: number;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
}
