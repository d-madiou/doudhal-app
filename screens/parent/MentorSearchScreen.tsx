"use client"
import React from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

// Mock types for demonstration
interface MentorSearchScreenProps {
  navigation: {
    navigate: (screen: string) => void
  }
}

const { width } = Dimensions.get("window")

export default function MentorSearchScreen({ navigation }: MentorSearchScreenProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedSubject, setSelectedSubject] = React.useState<string | null>(null)
  const [location, setLocation] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [mentors, setMentors] = React.useState<any[]>([])

  const availableSubjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Quran", "Arabic"]

  const handleSearch = async () => {
    setIsLoading(true)
    console.log("Searching for mentors with:", { searchQuery, selectedSubject, location })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setMentors([
      {
        id: 1,
        name: "Dr. Aisha Khan",
        subjects: ["Mathematics", "Physics"],
        location: "Conakry",
        rating: 4.8,
        bio: "Experienced math and physics tutor with 10+ years.",
        price: "$25/hr",
        availability: "Available",
      },
      {
        id: 2,
        name: "Mr. David Lee",
        subjects: ["English", "History"],
        location: "Dakar",
        rating: 4.5,
        bio: "Passionate about English literature and world history.",
        price: "$20/hr",
        availability: "Busy",
      },
      {
        id: 3,
        name: "Ustaz Omar",
        subjects: ["Quran", "Arabic"],
        location: "Conakry",
        rating: 5.0,
        bio: "Certified Quranic reciter and Arabic language expert.",
        price: "$18/hr",
        availability: "Available",
      },
    ])
    setIsLoading(false)
  }

  const SubjectChip = ({ subject, isSelected, onPress }: any) => (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-full m-1 ${isSelected ? "bg-lime-400" : "bg-gray-800 border border-gray-600"}`}
      style={{
        shadowColor: isSelected ? "#B4E50D" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isSelected ? 0.3 : 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text className={`font-medium ${isSelected ? "text-black" : "text-lime-400"}`}>{subject}</Text>
    </TouchableOpacity>
  )

  const MentorCard = ({ mentor }: any) => (
    <View
      className="bg-gray-900 rounded-2xl p-6 mb-4 border border-gray-700"
      style={{
        shadowColor: "#B4E50D",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-1">
          <Text className="text-xl font-bold text-lime-400 mb-1">{mentor.name}</Text>
          <View className="flex-row items-center mb-2">
            <Ionicons name="location-outline" size={16} color="#B4E50D" />
            <Text className="text-gray-300 ml-1">{mentor.location}</Text>
          </View>
        </View>
        <View className="items-end">
          <View className="flex-row items-center mb-1">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="text-white font-bold ml-1">{mentor.rating}</Text>
          </View>
          <Text className="text-lime-400 font-bold">{mentor.price}</Text>
        </View>
      </View>

      <View className="flex-row flex-wrap mb-3">
        {mentor.subjects.map((subject: string, index: number) => (
          <View key={index} className="bg-gray-800 rounded-full px-3 py-1 mr-2 mb-2">
            <Text className="text-lime-400 text-sm">{subject}</Text>
          </View>
        ))}
      </View>

      <Text className="text-gray-300 text-sm mb-4 leading-5">{mentor.bio}</Text>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View
            className={`w-3 h-3 rounded-full mr-2 ${
              mentor.availability === "Available" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <Text className="text-gray-400 text-sm">{mentor.availability}</Text>
        </View>

        <TouchableOpacity
          className="bg-lime-400 px-6 py-2 rounded-full"
          style={{
            shadowColor: "#B4E50D",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text className="text-black font-bold">View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View className="flex-1 bg-black">
        {/* Header */}
        <LinearGradient
          colors={["#000000", "#1a1a1a", "#2a2a2a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="pt-12 pb-6 px-6"
        >
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={() => navigation.navigate("ParentHome")}
              className="mr-4 p-2 rounded-full bg-gray-800"
            >
              <Ionicons name="arrow-back" size={24} color="#B4E50D" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-lime-400 flex-1">Find Your Mentor</Text>
            <TouchableOpacity className="p-2 rounded-full bg-gray-800">
              <Ionicons name="filter-outline" size={24} color="#B4E50D" />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-400 text-base">Discover qualified mentors for your learning journey</Text>
        </LinearGradient>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Search Form */}
          <View
            className="bg-gray-900 rounded-2xl p-6 mb-6 mt-4 border border-gray-700"
            style={{
              shadowColor: "#B4E50D",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            {/* Search Input */}
            <View className="mb-4">
              <Text className="text-lime-400 font-semibold mb-2">Search Mentors</Text>
              <View className="flex-row items-center bg-gray-800 rounded-xl px-4 border border-gray-600">
                <Ionicons name="search-outline" size={20} color="#B4E50D" />
                <TextInput
                  className="flex-1 h-12 text-white ml-3"
                  placeholder="Search by name or keyword..."
                  placeholderTextColor="#6B7280"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

            {/* Location Input */}
            <View className="mb-4">
              <Text className="text-lime-400 font-semibold mb-2">Location</Text>
              <View className="flex-row items-center bg-gray-800 rounded-xl px-4 border border-gray-600">
                <Ionicons name="location-outline" size={20} color="#B4E50D" />
                <TextInput
                  className="flex-1 h-12 text-white ml-3"
                  placeholder="Enter location (e.g., Conakry)"
                  placeholderTextColor="#6B7280"
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
            </View>

            {/* Subject Selection */}
            <View className="mb-6">
              <Text className="text-lime-400 font-semibold mb-3">Select Subject</Text>
              <View className="flex-row flex-wrap">
                {availableSubjects.map((subject, index) => (
                  <SubjectChip
                    key={index}
                    subject={subject}
                    isSelected={selectedSubject === subject}
                    onPress={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
                  />
                ))}
              </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity
              onPress={handleSearch}
              disabled={isLoading}
              className={`rounded-xl p-4 ${isLoading ? "bg-gray-600" : "bg-lime-400"}`}
              style={{
                shadowColor: "#B4E50D",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              {isLoading ? (
                <View className="flex-row items-center justify-center">
                  <ActivityIndicator color="#000" size="small" />
                  <Text className="text-black font-bold text-lg ml-2">Searching...</Text>
                </View>
              ) : (
                <View className="flex-row items-center justify-center">
                  <Ionicons name="search" size={20} color="#000" />
                  <Text className="text-black font-bold text-lg ml-2">Search Mentors</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Results */}
          {mentors.length > 0 && (
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-bold text-lime-400">{mentors.length} Mentors Found</Text>
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-gray-400 mr-1">Sort by</Text>
                  <Ionicons name="chevron-down" size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {mentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </View>
          )}

          {/* Empty State */}
          {mentors.length === 0 && !isLoading && (
            <View className="items-center py-12">
              <View className="bg-gray-800 rounded-full p-6 mb-4">
                <Ionicons name="search-outline" size={48} color="#B4E50D" />
              </View>
              <Text className="text-gray-400 text-lg mb-2">No mentors found yet</Text>
              <Text className="text-gray-500 text-center">Use the search form above to find qualified mentors</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  )
}
