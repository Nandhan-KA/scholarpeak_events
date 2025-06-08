'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../lib/api/axios';
import { authApi, AuthResponse } from '../lib/api/auth';

// Define interfaces for API responses
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  register: (name: string, email: string, password: string) => Promise<boolean | { success: boolean, userId?: string }>;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean | string>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // On initial mount, check for token to provide immediate UI feedback
  useEffect(() => {
    // Immediately check for tokens to set initial state
    const token = typeof window !== 'undefined' ? localStorage.getItem('user_token') : null;
    
    // If token exists, assume authenticated until proven otherwise
    if (token) {
      console.log('Token found in storage, assuming authenticated until verified');
      setIsAuthenticated(true);
      
      // Try to get cached user info from localStorage for immediate display
      const cachedUserInfo = localStorage.getItem('user_info');
      if (cachedUserInfo) {
        try {
          const userInfo = JSON.parse(cachedUserInfo);
          console.log('Using cached user info for immediate display');
          setUser(userInfo);
        } catch (error) {
          console.error('Error parsing cached user info:', error);
        }
      }
      
      // Apply token to axios headers
      applyTokenToHeaders();
    }
  }, []);
  
  // Function to apply tokens to axios headers
  const applyTokenToHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('user_token') : null;
    if (token) {
      console.log('Applying token to headers:', token.substring(0, 10) + '...');
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };
  
  // Check if user is authenticated
  useEffect(() => {
    checkAuth();
  }, []);

  // Function to check if user is authenticated
  const checkAuth = async () => {
    try {
      setIsLoading(true);
      
      // Apply token to headers in case it's changed
      applyTokenToHeaders();
      
      // Make API request to get user profile
      const response = await authApi.getProfile();
      
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        
        // Cache user info for faster loading next time
        localStorage.setItem('user_info', JSON.stringify(response.data.user));
      } else {
        // No valid user found
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user_info');
        localStorage.removeItem('user_token');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user_info');
      localStorage.removeItem('user_token');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Login function
  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<boolean | string> => {
    try {
      const response = await authApi.login(email, password);
      console.log('Login response:', response.data);
      
      if (response.data.success && response.data.token) {
        // IMPORTANT: Store token in localStorage
        const token = response.data.token;
        localStorage.setItem('user_token', token);
        console.log('Token saved to localStorage:', token.substring(0, 10) + '...');
        
        // Make sure token is immediately available for this session
        console.log('Setting auth token to headers');
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // If user data is returned, use it
        if (response.data.user) {
          setUser(response.data.user);
          localStorage.setItem('user_info', JSON.stringify(response.data.user));
        }
        
        setIsAuthenticated(true);
        return true;
      } else if (response.data.needsOTPVerification && response.data.userId) {
        // Needs OTP verification - user has not verified email yet
        console.log('User needs OTP verification:', response.data.userId);
        return `needs_otp_verification:${response.data.userId}`;
      } else {
        return response.data.message || 'Login failed';
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return error.response?.data?.message || 'An error occurred during login';
    }
  };
  
  // Logout function
  const logout = () => {
    console.log('Logging out user');
    
    // First clear auth state
    setUser(null);
    setIsAuthenticated(false);
    
    // Remove tokens and user info from localStorage
    if (typeof window !== 'undefined') {
      console.log('Removing token from localStorage');
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_info');
    }
    
    // Clear Authorization header from axios
    console.log('Removing token from Authorization headers');
    delete axiosInstance.defaults.headers.common['Authorization'];
    
    // Redirect to login page
    router.push('/login');
  };
  
  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean | { success: boolean, userId?: string }> => {
    try {
      const response = await authApi.register(name, email, password);
      
      if (response.data.success) {
        // Usually registration returns userId for OTP verification
        if (response.data.userId) {
          return {
            success: true,
            userId: response.data.userId
          };
        }
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  // Provide the auth context to children
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        register,
        login,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 