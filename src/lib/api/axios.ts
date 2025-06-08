import axios from 'axios';

// Get the API URL from environment variables or use a default
const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Default to the main ScholarPeak API in development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000/api';
  }
  
  // Production fallback to main ScholarPeak API
  return 'https://api.scholarpeak.com/api';
};

console.log('API URL:', getApiUrl());

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 second timeout
});

// Function to get token from storage
const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('user_token');
};

// Initialize with token if available
if (typeof window !== 'undefined') {
  const token = getToken();
  if (token) {
    console.log('Initializing axios with token:', token.substring(0, 10) + '...');
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

// Add a request interceptor to include authorization headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    if (typeof window !== 'undefined') {
      const token = getToken();
      
      if (token) {
        console.log(`Request interceptor [${config.url}]: Adding token to request headers`);
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        console.log(`Request interceptor [${config.url}]: No token found in localStorage`);
      }
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle session expiration or unauthorized access
    if (error.response && error.response.status === 401) {
      console.log('Response interceptor: 401 Unauthorized response received', error.config.url);
      
      // Only clear tokens if we're in a browser environment and not already on login page
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        console.log('Response interceptor: Clearing token and redirecting to login');
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_info');
        
        // Create redirect with return URL
        const returnPath = window.location.pathname + window.location.search;
        window.location.href = `/login?redirect=${encodeURIComponent(returnPath)}`;
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { getApiUrl, getToken }; 