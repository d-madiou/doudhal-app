import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, registerUser, logoutUser, UserData, setAuthTokenInterceptor } from '../api/auth';

// Define the shape of the registration form data (for context's register function)
interface RegisterFormData {
  email: string;
  password: string;
  password2: string;
  name: string;
  phone_number?: string; // Optional as per your model
  role: 'parent_student' | 'mentor';
}

// Define the shape of the AuthContext value
interface AuthContextType {
  isLoggedIn: boolean; // Derived from authToken presence
  authToken: string | null;
  user: UserData | null;
  isLoading: boolean; // Indicates if an async auth operation is in progress
  login: (email: string, password: string) => Promise<void>;
  register: (formData: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage helper functions with fallback
const secureStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      // Try expo-secure-store first
      const SecureStore = require('expo-secure-store');
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.warn('SecureStore not available, using AsyncStorage:', error);
      try {
        return await AsyncStorage.getItem(key);
      } catch (asyncError) {
        console.error('Storage error:', asyncError);
        return null;
      }
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      // Try expo-secure-store first
      const SecureStore = require('expo-secure-store');
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.warn('SecureStore not available, using AsyncStorage:', error);
      try {
        await AsyncStorage.setItem(key, value);
      } catch (asyncError) {
        console.error('Storage error:', asyncError);
        throw asyncError;
      }
    }
  },

  async deleteItem(key: string): Promise<void> {
    try {
      // Try expo-secure-store first
      const SecureStore = require('expo-secure-store');
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.warn('SecureStore not available, using AsyncStorage:', error);
      try {
        await AsyncStorage.removeItem(key);
      } catch (asyncError) {
        console.error('Storage error:', asyncError);
        throw asyncError;
      }
    }
  }
};

// AuthProvider component to provide authentication state and functions
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start as true to indicate loading auth state

  // Effect to load auth token from storage on app start
  useEffect(() => {
    const loadAuthToken = async () => {
      try {
        console.log('Loading auth token from storage...');
        const token = await secureStorage.getItem('authToken');
        console.log('Token loaded:', !!token);
        
        if (token) {
          setAuthToken(token);
          setAuthTokenInterceptor(token); // Set token for Axios immediately
          
          // Load user data
          const storedUser = await secureStorage.getItem('userData');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log('User loaded:', parsedUser.email);
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error('Failed to load auth token or user data:', error);
        // Clear corrupted data
        try {
          await secureStorage.deleteItem('authToken');
          await secureStorage.deleteItem('userData');
        } catch (cleanupError) {
          console.error('Failed to cleanup corrupted data:', cleanupError);
        }
      } finally {
        setIsLoading(false); // Loading complete
        console.log('Auth loading complete');
      }
    };

    loadAuthToken();
  }, []); // Empty dependency array means this runs once on mount

  // Update Axios interceptor whenever authToken changes
  useEffect(() => {
    setAuthTokenInterceptor(authToken);
    console.log('Auth token updated, isLoggedIn:', !!authToken);
  }, [authToken]);

  // Calls auth.loginUser to log in the user
  const login = async (email: string, password: string) => {
    console.log('Starting login process...');
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      console.log('Login API successful, saving token and user...');
      
      setAuthToken(response.token);
      setUser(response.user);
      
      await secureStorage.setItem('authToken', response.token);
      await secureStorage.setItem('userData', JSON.stringify(response.user));
      
      console.log('Login complete, user:', response.user.email);
    } catch (error) {
      console.error('Login failed in context:', error);
      // Clear any partial state on login failure
      setAuthToken(null);
      setUser(null);
      try {
        await secureStorage.deleteItem('authToken');
        await secureStorage.deleteItem('userData');
      } catch (cleanupError) {
        console.error('Failed to cleanup after login failure:', cleanupError);
      }
      throw error; // Propagate error to be handled by UI
    } finally {
      setIsLoading(false);
    }
  };

  // Calls auth.registerUser to register a new user
  const register = async (formData: RegisterFormData) => {
    console.log('Starting registration process...');
    setIsLoading(true);
    try {
      const response = await registerUser(formData);
      console.log('Registration API successful, saving token and user...');
      
      setAuthToken(response.token);
      setUser(response.user);
      
      await secureStorage.setItem('authToken', response.token);
      await secureStorage.setItem('userData', JSON.stringify(response.user));
      
      console.log('Registration complete, user:', response.user.email);
    } catch (error) {
      console.error('Registration failed in context:', error);
      // Clear any partial state on registration failure
      setAuthToken(null);
      setUser(null);
      try {
        await secureStorage.deleteItem('authToken');
        await secureStorage.deleteItem('userData');
      } catch (cleanupError) {
        console.error('Failed to cleanup after registration failure:', cleanupError);
      }
      throw error; // Propagate error to be handled by UI
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    console.log('Starting logout process...');
    setIsLoading(true);
    try {
      if (authToken) { // Only attempt API logout if token exists
        await logoutUser(authToken);
      }
      // Always clear local state and storage regardless of API logout success
      setAuthToken(null);
      setUser(null);
      await secureStorage.deleteItem('authToken');
      await secureStorage.deleteItem('userData');
      console.log('Logout complete');
    } catch (error) {
      console.error('Logout failed in context:', error);
      // Even if API logout fails, clear local state for user experience
      setAuthToken(null);
      setUser(null);
      try {
        await secureStorage.deleteItem('authToken');
        await secureStorage.deleteItem('userData');
      } catch (cleanupError) {
        console.error('Failed to cleanup after logout failure:', cleanupError);
      }
      throw error; // Propagate error if needed for UI feedback
    } finally {
      setIsLoading(false);
    }
  };

  // The value provided to consumers of the context
  const contextValue: AuthContextType = {
    isLoggedIn: !!authToken, // Derived state: true if authToken exists
    authToken,
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};