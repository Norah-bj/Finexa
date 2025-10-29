import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor for adding auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API methods for users
export const userApi = {
  // Create a new user
  createUser: (userData: { fullName: string; email: string; age: number; password: string }) => 
    api.post('/users', userData),
  
  // Get all users
  getUsers: () => api.get('/users'),
  
  // Get user profile
  getUserProfile: (userId: string) => api.get(`/users/${userId}/profile`),
  
  // Get financial summary
  getFinancialSummary: (userId: string) => api.get(`/users/${userId}/financial-summary`),
};

export default api;
