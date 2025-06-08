// Competition types
export interface Competition {
  id: string;
  title: string;
  description: string;
  date: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  participants: number;
  status: 'upcoming' | 'active' | 'completed';
}

// Problem types
export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  solvedCount: number;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

// Authentication types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 
 