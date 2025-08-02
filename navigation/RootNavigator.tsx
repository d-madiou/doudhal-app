import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList, AppStackParamList } from './types';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator, Text } from 'react-native';

// Import Screens
import WelcomeScreen from '../screens/common/WelcomeScreen'; // New: Import WelcomeScreen
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Import the MainTabNavigator (which contains all your bottom tabs)
import MainTabNavigator from './MainTabNavigator'; 

// Create Stack Navigators
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>(); // This stack will contain our tab navigators

/**
 * AuthNavigator: Handles the authentication flow (Welcome -> Login -> Register).
 * WelcomeScreen is the initial entry point for unauthenticated users.
 */
function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Welcome" // Start with the Welcome Screen
      screenOptions={{
        headerShown: false, // Hide header for auth screens
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <AuthStack.Screen 
        name="Welcome" 
        component={WelcomeScreen}
      />
      <AuthStack.Screen 
        name="Login" 
        component={LoginScreen}
      />
      <AuthStack.Screen 
        name="Register" 
        component={RegisterScreen}
      />
    </AuthStack.Navigator>
  );
}

/**
 * MainAppNavigator: Handles the authenticated part of the application.
 * It primarily renders the MainTabNavigator (your bottom tabs).
 */
function MainAppNavigator() {
  // The user role is used here for conditional rendering if you had different tab sets for roles.
  // For now, both roles use the same MainTabNavigator.
  const { user } = useAuth(); 
  const mockedUserRole = 'parent_student'; // TEMPORARY: For testing specific role UIs
  const userRole = user?.role || mockedUserRole;

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {/* MainTabs screen renders your MainTabNavigator (bottom tabs) */}
      <AppStack.Screen name="MainTabs" component={MainTabNavigator} />
      
      {/* Add other full-screen modals or screens here that are NOT part of the bottom tabs.
          For example, a booking confirmation flow that overlays the entire app.
          Example: <AppStack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
      */}
    </AppStack.Navigator>
  );
}

/**
 * RootNavigator: The top-level navigator that decides whether to show the
 * authentication flow or the main authenticated app based on user login status.
 */
export default function RootNavigator() {
  const { isLoading, isLoggedIn, user } = useAuth(); // Use actual auth state from context

  // --- TEMPORARY OVERRIDE FOR UI TESTING ---
  // Uncomment these lines to force login state for UI development
  // const isLoading = false; 
  // const isLoggedIn = true; 
  // const user = { id: 1, email: 'mock@example.com', name: 'Mock User', role: 'parent_student' }; // Mock user data if needed
  // --- END TEMPORARY OVERRIDE ---

  console.log('RootNavigator - Auth State:', { isLoading, isLoggedIn, hasUser: !!user, userEmail: user?.email });

  if (isLoading) {
    // Show a global loading screen while authentication state is being determined
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-lg text-gray-700">Loading app...</Text>
      </View>
    );
  }

  // Decide which top-level navigator to show
  console.log('RootNavigator - Navigation Decision:', isLoggedIn ? 'Showing MainAppNavigator' : 'Showing AuthNavigator');
  return isLoggedIn ? <MainAppNavigator /> : <AuthNavigator />;
}
