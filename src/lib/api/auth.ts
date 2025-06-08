import axiosInstance from './axios';

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  message?: string;
  userId?: string;
  needsOTPVerification?: boolean;
}

// User auth API functions
export const authApi = {
  login: (email: string, password: string) => 
    axiosInstance.post<AuthResponse>('/user/login', { email, password }),
  
  register: (name: string, email: string, password: string) => 
    axiosInstance.post<AuthResponse>('/user/register', { name, email, password }),
  
  getProfile: () => 
    axiosInstance.get<AuthResponse>('/user/profile'),
  
  verifyOTP: (userId: string, otp: string) =>
    axiosInstance.post<AuthResponse>('/user/verify-otp', { userId, otp }),
  
  resendOTP: (userId: string) =>
    axiosInstance.post<AuthResponse>('/user/resend-otp', { userId }),
  
  requestPasswordReset: (email: string) =>
    axiosInstance.post<AuthResponse>('/user/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) =>
    axiosInstance.post<AuthResponse>(`/user/reset-password/${token}`, { password })
}; 