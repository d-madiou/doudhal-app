import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Platform-aware storage utility
class StorageService {
  // Check if we're on a platform that supports SecureStore
  private isSecureStoreAvailable(): boolean {
    return Platform.OS === 'ios' || Platform.OS === 'android';
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (this.isSecureStoreAvailable()) {
        await SecureStore.setItemAsync(key, value);
      } else {
        // Fallback to localStorage for web
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, value);
        } else {
          console.warn('No storage available');
        }
      }
    } catch (error) {
      console.error('Failed to store item:', error);
      throw error;
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      if (this.isSecureStoreAvailable()) {
        return await SecureStore.getItemAsync(key);
      } else {
        // Fallback to localStorage for web
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(key);
        } else {
          console.warn('No storage available');
          return null;
        }
      }
    } catch (error) {
      console.error('Failed to retrieve item:', error);
      return null;
    }
  }

  async deleteItem(key: string): Promise<void> {
    try {
      if (this.isSecureStoreAvailable()) {
        await SecureStore.deleteItemAsync(key);
      } else {
        // Fallback to localStorage for web
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(key);
        } else {
          console.warn('No storage available');
        }
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const storage = new StorageService();