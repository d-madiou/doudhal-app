import axios, { AxiosError } from 'axios';

// Define the base URL for your API
const API_BASE_URL = 'http://172.16.124.89:8000/api/auth';

// --- Type Definitions for API Responses ---

// User data structure from Django backend
export interface UserData {
  id: number;
  email: string;
  name: string;
  role: 'parent_student' | 'mentor';
  phone_number?: string;
}

// Response structure for successful login/registration
export interface AuthResponse {
  user: UserData;
  token: string;
}

// --- Axios Instance for API Calls ---
// Create an Axios instance to easily set base URL and headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- API Functions ---

/**
 * Handles user login.
 * @param email User's email.
 * @param password User's password.
 * @returns Promise resolving to AuthResponse on success.
 * @throws AxiosError with specific error message on failure.
 */
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/login/', { email, password });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Login failed:', axiosError.response?.data || axiosError.message);
    throw new Error((axiosError.response?.data as { detail?: string })?.detail || 'Login failed. Please check your credentials.');
  }
};

/**
 * Handles user registration.
 * @param formData Registration data including email, passwords, name, phone_number, role.
 * @returns Promise resolving to AuthResponse on success.
 * @throws AxiosError with specific error message on failure.
 */
export const registerUser = async (formData: {
  email: string;
  password: string;
  password2: string;
  name: string;
  phone_number?: string;
  role: 'parent_student' | 'mentor';
}): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/register/', formData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Registration failed:', axiosError.response?.data || axiosError.message);
    // Re-throw with validation errors or a generic message
    const errorMessage = (axiosError.response?.data as { [key: string]: string[] }) || axiosError.message;
    if (typeof errorMessage === 'object' && errorMessage !== null) {
      // If it's a validation error object, stringify it
      throw new Error(JSON.stringify(errorMessage));
    }
    throw new Error('Registration failed. Please try again.');
  }
};

/**
 * Handles user logout.
 * @param token The user's authentication token.
 * @returns Promise resolving on success.
 * @throws AxiosError on failure.
 */
export const logoutUser = async (token: string): Promise<void> => {
  try {
    // Note: Django's logout endpoint requires the token in the Authorization header
    await api.post('/logout/', null, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Logout failed:', axiosError.response?.data || axiosError.message);
    throw new Error('Logout failed. Please try again.');
  }
};

// --- Axios Interceptor for Authorization Header ---
// This interceptor will automatically add the Authorization header to every request
// if a token is available. This is crucial for all authenticated API calls.
export const setAuthTokenInterceptor = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Export the configured axios instance if other modules need it directly
export default api;
