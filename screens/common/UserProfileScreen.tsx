import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { UserProfileScreenProps } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

export default function UserProfileScreen({}: UserProfileScreenProps) {
  const { user, isLoading } = useAuth(); // Get user and isLoading from context

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-lg text-gray-700">Loading user profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-red-50 p-4">
        <Text className="text-xl text-red-800 font-bold">User data not available.</Text>
        <Text className="text-md text-red-600 mt-2">Please try logging in again.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center bg-gray-100 p-6">
      <View className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mt-8">
        <Text className="text-3xl font-extrabold text-center mb-8 text-indigo-800">
          My Profile
        </Text>
        
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">Email:</Text>
          <Text className="text-xl text-gray-900">{user.email}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">Name:</Text>
          <Text className="text-xl text-gray-900">{user.name}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">Role:</Text>
          <Text className="text-xl text-gray-900 capitalize">{user.role.replace('_', ' ')}</Text>
        </View>

        {user.phone_number && (
          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-700">Phone Number:</Text>
            <Text className="text-xl text-gray-900">{user.phone_number}</Text>
          </View>
        )}
        
        {/* Add more profile details here if needed, e.g., mentor-specific or child-specific */}

      </View>
    </View>
  );
}
