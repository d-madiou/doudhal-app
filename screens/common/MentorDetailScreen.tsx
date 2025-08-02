"use client"
import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import MentorDetailModal from "../../components/modal/MentorDetailModal"
import CardMentor from "../../components/ui/CardMentor"
import { colors } from "../../utils/colors"
import { mentors, subjects } from "../../utils/mockData"


// Mock types for demonstration
interface MentorScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void
  }
}

export default function MentorListScreen({ navigation }: MentorScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [showMapView, setShowMapView] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [showMentorDetail, setShowMentorDetail] = useState(false)


  const filteredMentors =
    selectedSubject && selectedSubject !== "All"
      ? mentors.filter((mentor) =>
          mentor.subjects.some((subject) => subject.toLowerCase().includes(selectedSubject.toLowerCase())),
        )
      : mentors

  const SubjectChip = ({ subject, isSelected, onPress }: any) => (
    <TouchableOpacity
      onPress={onPress}
      className="px-4 py-2 rounded-full mr-3"
      style={{
        backgroundColor: isSelected ? colors.indigo : colors.white,
        borderWidth: 1,
        borderColor: colors.indigo,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text
        className="font-medium"
        style={{
          color: isSelected ? colors.white : colors.indigo,
        }}
      >
        {subject}
      </Text>
    </TouchableOpacity>
  )

  const handleMentorPress = (mentor: any) => {
    setSelectedMentor(mentor)
    setShowMentorDetail(true)
  }

  const handleModalClose = () => {
    setShowMentorDetail(false)
    setSelectedMentor(null)
  }
  const handleBookPress = (mentor: any) => {
  navigation.navigate("BookingScreen", { 
    mentor,
    selectedSubject 
  })
}

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.lightGrey }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.indigo} />

      {/* Header Section */}
      <View style={{ backgroundColor: colors.indigo }} className="pt-4 pb-6 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-white text-2xl font-bold">Find Mentors</Text>
          <TouchableOpacity
            onPress={() => setShowMapView(!showMapView)}
            className="rounded-full p-2"
            style={{ backgroundColor: showMapView ? colors.amber : "rgba(255,255,255,0.2)" }}
          >
            <Ionicons name="map-outline" size={24} color={showMapView ? colors.charcoal : colors.white} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center rounded-2xl px-4" style={{ backgroundColor: colors.white }}>
          <Ionicons name="search-outline" size={20} color={colors.grey} />
          <TextInput
            className="flex-1 h-12 ml-3"
            style={{ color: colors.charcoal }}
            placeholder="Search by subject, name, location..."
            placeholderTextColor={colors.grey}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color={colors.grey} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Subject Filter Carousel */}
      <View className="py-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
          {subjects.map((subject, index) => (
            <SubjectChip
              key={index}
              subject={subject}
              isSelected={selectedSubject === subject}
              onPress={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Map View Toggle Message */}
      {showMapView && (
        <View className="mx-4 mb-4 p-4 rounded-xl" style={{ backgroundColor: colors.amber }}>
          <Text className="text-center font-semibold" style={{ color: colors.charcoal }}>
            🗺️ Map view would show mentors near your location
          </Text>
          <Text className="text-center text-sm mt-1" style={{ color: colors.charcoal }}>
            Location permission required
          </Text>
        </View>
      )}

      {/* Mentor List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="py-2">
          <View className="flex-row items-center justify-between px-4 mb-4">
            <Text className="font-bold text-lg" style={{ color: colors.charcoal }}>
              {filteredMentors.length} Mentors Found
            </Text>
            <TouchableOpacity className="flex-row items-center">
              <Text style={{ color: colors.grey }} className="mr-1">
                Sort by
              </Text>
              <Ionicons name="chevron-down" size={16} color={colors.grey} />
            </TouchableOpacity>
          </View>

          {filteredMentors.map((mentor) => (
            <CardMentor key={mentor.id} mentor={mentor} onPress={handleMentorPress} onBookPress={handleBookPress} />
          ))}
        </View>
      </ScrollView>

      <MentorDetailModal
        visible={showMentorDetail}
        selectedMentor={selectedMentor}
        onClose={handleModalClose}
        onBookPress={handleBookPress}
      />
    </SafeAreaView>
  )
}