"use client"
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, ScrollView, StatusBar, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

// Mock types for demonstration
interface User {
  name?: string
  email: string
  role: string
}

interface ParentHomeScreenProps {
  navigation: {
    navigate: (screen: string) => void
  }
}

interface AuthContextType {
  user: User | null
  logout: () => Promise<void>
  isLoading: boolean
}

// Mock useAuth hook for demonstration
const useAuth = (): AuthContextType => ({
  user: {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "parent",
  },
  logout: async () => {
    // Mock logout function
    await new Promise((resolve) => setTimeout(resolve, 1000))
  },
  isLoading: false,
})

const { width } = Dimensions.get("window")

export default function ParentHomeScreen({ navigation }: ParentHomeScreenProps) {
  const { user, logout, isLoading } = useAuth()

  const handleLogout = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await logout()
          } catch (error) {
            Alert.alert("Error", "Failed to sign out. Please try again.")
            console.error("Logout failed:", error)
          }
        },
      },
    ])
  }

  const handleNavigateToMentorSearch = () => {
    navigation.navigate("MentorSearch")
  }

  const handleNavigateToMyChildren = () => {
    navigation.navigate("MyChildren")
  }

  const ActionCard = ({
    title,
    subtitle,
    icon,
    colors,
    onPress,
  }: {
    title: string
    subtitle: string
    icon: string
    colors: readonly [string, string, ...string[]]
    onPress: () => void
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="mb-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-6 flex-row items-center"
      >
        <View className="bg-white/20 rounded-full p-3 mr-4">
          <Ionicons name={icon as any} size={28} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-white text-lg font-bold mb-1">{title}</Text>
          <Text className="text-white/80 text-sm">{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </LinearGradient>
    </TouchableOpacity>
  )

  const StatCard = ({
    number,
    label,
    icon,
  }: {
    number: string
    label: string
    icon: string
  }) => (
    <View
      className="bg-white rounded-xl p-4 flex-1 mx-1 items-center"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View className="bg-blue-50 rounded-full p-2 mb-2">
        <Ionicons name={icon as any} size={20} color="#3B82F6" />
      </View>
      <Text className="text-2xl font-bold text-gray-800 mb-1">{number}</Text>
      <Text className="text-xs text-gray-500 text-center">{label}</Text>
    </View>
  )

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />
      <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={["#1E40AF", "#3B82F6", "#60A5FA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="pt-12 pb-8 px-6 rounded-b-3xl"
        >
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-1">
              <Text className="text-white/80 text-base mb-1">Welcome back,</Text>
              <Text className="text-white text-2xl font-bold">{user?.name || "Parent"}! 👋</Text>
            </View>
            <TouchableOpacity
              className="bg-white/20 rounded-full p-3"
              onPress={() => {
                /* Handle notifications */
              }}
            >
              <Ionicons name="notifications-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Stats Row */}
          <View className="flex-row mt-4">
            <StatCard number="3" label="Active Children" icon="people-outline" />
            <StatCard number="2" label="Active Mentors" icon="school-outline" />
            <StatCard number="12" label="Sessions This Month" icon="calendar-outline" />
          </View>
        </LinearGradient>

        {/* Main Content */}
        <View className="px-6 py-6">
          {/* Quick Actions Section */}
          <View className="mb-8">
            <Text className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</Text>

            <ActionCard
              title="Find a Mentor"
              subtitle="Discover qualified mentors for your children"
              icon="search-outline"
              colors={["#10B981", "#059669"]}
              onPress={handleNavigateToMentorSearch}
            />

            <ActionCard
              title="Manage Children"
              subtitle="View progress and manage your children's profiles"
              icon="people-outline"
              colors={["#8B5CF6", "#7C3AED"]}
              onPress={handleNavigateToMyChildren}
            />
          </View>

          {/* Recent Activity */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-800 mb-4">Recent Activity</Text>
            <View
              className="bg-white rounded-2xl p-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View className="flex-row items-center mb-3">
                <View className="bg-green-100 rounded-full p-2 mr-3">
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Math session completed</Text>
                  <Text className="text-gray-500 text-sm">Emma • 2 hours ago</Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="bg-blue-100 rounded-full p-2 mr-3">
                  <Ionicons name="calendar" size={16} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">New session scheduled</Text>
                  <Text className="text-gray-500 text-sm">Alex • Tomorrow at 3:00 PM</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Account Info */}
          {user && (
            <View
              className="bg-white rounded-2xl p-6 mb-6"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View className="flex-row items-center mb-4">
                <View className="bg-blue-100 rounded-full p-3 mr-4">
                  <Ionicons name="person-outline" size={24} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-800">Account Information</Text>
                  <Text className="text-gray-500 text-sm">Manage your profile settings</Text>
                </View>
              </View>

              <View className="border-t border-gray-100 pt-4">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-gray-600">Email</Text>
                  <Text className="text-gray-800 font-medium">{user.email}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-600">Role</Text>
                  <Text className="text-gray-800 font-medium capitalize">{user.role.replace("_", " ")}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            disabled={isLoading}
            className={`rounded-2xl p-4 flex-row items-center justify-center ${
              isLoading ? "bg-gray-300" : "bg-red-500"
            }`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={20} color="white" />
                <Text className="text-white text-lg font-semibold ml-2">Sign Out</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  )
}
