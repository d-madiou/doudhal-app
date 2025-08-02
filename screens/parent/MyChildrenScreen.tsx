import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { MyChildrenScreenProps } from '../../navigation/types';
// import { useAuth } from '../../context/AuthContext'; // Might be needed for fetching children

export default function MyChildrenScreen({ navigation }: MyChildrenScreenProps) {
  const [children, setChildren] = React.useState<any[]>([]); // To store child profiles
  const [isLoading, setIsLoading] = React.useState(false); // For loading state

  React.useEffect(() => {
    const fetchChildren = async () => {
      setIsLoading(true);
      // TODO: Implement API call to /api/auth/children/
      console.log('Fetching child profiles...');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setChildren([
        { id: 1, name: 'Ahmad', date_of_birth: '2015-03-10', gender: 'Male', grade_level: '5th Grade' },
        { id: 2, name: 'Fatima', date_of_birth: '2018-07-22', gender: 'Female', grade_level: '2nd Grade' },
      ]);
      setIsLoading(false);
    };
    fetchChildren();
  }, []);

  const handleAddChild = () => {
    // TODO: Navigate to a screen for adding a new child
    Alert.alert('Add Child', 'Add new child functionality coming soon!');
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="w-full bg-blue-600 p-4 rounded-b-xl shadow-md items-center mb-6">
        <Text className="text-3xl font-bold text-white mt-8">
          My Children
        </Text>
        <Text className="text-lg text-blue-100 mt-1">
          Manage your childrens profiles.
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {isLoading ? (
          <View className="flex-1 justify-center items-center py-10">
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text className="mt-4 text-lg text-gray-700">Loading children...</Text>
          </View>
        ) : children.length === 0 ? (
          <View className="flex-1 justify-center items-center py-10">
            <Text className="text-xl text-gray-600 text-center mb-4">
              No children profiles found.
            </Text>
            <TouchableOpacity
              className="px-6 py-3 bg-green-500 rounded-lg shadow-md active:bg-green-600"
              onPress={handleAddChild}
            >
              <Text className="text-lg font-bold text-white">
                Add Your First Child
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="bg-white p-6 rounded-xl shadow-md mb-6">
            <Text className="text-2xl font-bold text-gray-800 mb-4">
              Your Children:
            </Text>
            {children.map(child => (
              <View key={child.id} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
                <Text className="text-xl font-bold text-blue-700">{child.name}</Text>
                <Text className="text-base text-gray-700">Born: {child.date_of_birth}</Text>
                <Text className="text-base text-gray-700">Gender: {child.gender}</Text>
                <Text className="text-base text-gray-700">Grade: {child.grade_level}</Text>
                <TouchableOpacity className="mt-3 bg-yellow-500 px-4 py-2 rounded-lg self-start active:bg-yellow-600">
                  <Text className="text-white font-semibold">Edit Profile</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {children.length > 0 && (
        <TouchableOpacity
          className="w-full h-14 bg-blue-600 rounded-t-xl justify-center items-center shadow-md active:bg-blue-700"
          onPress={handleAddChild}
        >
          <Text className="text-xl font-bold text-white">
            Add New Child
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
