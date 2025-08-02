import React from 'react';
import { View, Text } from 'react-native';
import { MyBookingsScreenProps } from '../../navigation/types';

export default function MyBookingsScreen({}: MyBookingsScreenProps) {
  return (
    <View className="flex-1 justify-center items-center bg-yellow-50 p-4">
      <Text className="text-3xl font-bold text-yellow-800 mb-4">
        My Bookings
      </Text>
      <Text className="text-lg text-gray-700 text-center">
        View and manage your session bookings here.
      </Text>
      <Text className="text-sm text-gray-500 mt-2">
        (Coming Soon!)
      </Text>
    </View>
  );
}
