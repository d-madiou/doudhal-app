import React from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Modal,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../../utils/colors"


interface MentorDetailModalProps {
  visible: boolean
  selectedMentor: any
  onClose: () => void
  onBookPress: (mentor: any) => void
}

export default function MentorDetailModal({ visible, selectedMentor, onClose, onBookPress }: MentorDetailModalProps) {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.white }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
         <View className="flex-row items-center justify-between p-4" style={{ backgroundColor: colors.indigo }}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="arrow-back" size={24} color={colors.white} />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-white">Mentor Profile</Text>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>

          {selectedMentor && (
            <>
              {/* Profile Section */}
              <View className="items-center p-6" style={{ backgroundColor: colors.lightGrey }}>
                <View className="relative">
                  <Image
                    source={{ uri: selectedMentor.image }}
                    className="w-32 h-32 rounded-full"
                    style={{ backgroundColor: colors.grey, resizeMode: "cover" }}
                  />
                  {selectedMentor.isVerified && (
                    <View
                      className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full items-center justify-center"
                      style={{ backgroundColor: colors.blue }}
                    >
                      <Ionicons name="checkmark" size={20} color={colors.white} />
                    </View>
                  )}
                </View>

                <Text className="text-2xl font-bold mt-4" style={{ color: colors.charcoal }}>
                  {selectedMentor.name}
                </Text>

                <View className="flex-row items-center mt-2">
                  <Ionicons name="star" size={20} color={colors.amber} />
                  <Text className="font-bold text-lg ml-1" style={{ color: colors.charcoal }}>
                    {selectedMentor.rating}
                  </Text>
                  <Text className="ml-1" style={{ color: colors.grey }}>
                    ({selectedMentor.reviewCount} reviews)
                  </Text>
                </View>

                <View className="flex-row items-center mt-2">
                  <Ionicons name="location-outline" size={16} color={colors.grey} />
                  <Text className="ml-1" style={{ color: colors.grey }}>
                    {selectedMentor.location}
                  </Text>
                  <Text className="mx-2" style={{ color: colors.grey }}>
                    •
                  </Text>
                  <Text style={{ color: colors.grey }}>{selectedMentor.experience} experience</Text>
                </View>

                <View
                  className="px-4 py-2 rounded-full mt-3"
                  style={{
                    backgroundColor: selectedMentor.isAvailable ? colors.green : colors.red,
                  }}
                >
                  <Text className="text-white font-medium">
                    {selectedMentor.isAvailable ? "Available Now" : "Currently Busy"}
                  </Text>
                </View>
              </View>

              {/* Bio Section */}
              <View className="p-4">
                <Text className="text-lg font-bold mb-2" style={{ color: colors.charcoal }}>
                  About
                </Text>
                <Text className="leading-6" style={{ color: colors.grey }}>
                  {selectedMentor.bio}
                </Text>
              </View>

              {/* Subjects Section */}
              <View className="p-4">
                <Text className="text-lg font-bold mb-3" style={{ color: colors.charcoal }}>
                  Subjects Offered
                </Text>
                <View className="flex-row flex-wrap">
                  {selectedMentor.subjects.map((subject: string, index: number) => (
                    <View
                      key={index}
                      className="rounded-full px-4 py-2 mr-2 mb-2"
                      style={{
                        backgroundColor: index % 2 === 0 ? colors.mint : colors.indigo,
                      }}
                    >
                      <Text className="text-white font-medium">{subject}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Academic Levels */}
              <View className="p-4">
                <Text className="text-lg font-bold mb-3" style={{ color: colors.charcoal }}>
                  Academic Levels
                </Text>
                <View className="flex-row flex-wrap">
                  {selectedMentor.academicLevels.map((level: string, index: number) => (
                    <View
                      key={index}
                      className="rounded-lg px-3 py-2 mr-2 mb-2"
                      style={{
                        backgroundColor: colors.lightGrey,
                        borderWidth: 1,
                        borderColor: colors.indigo,
                      }}
                    >
                      <Text style={{ color: colors.indigo }} className="font-medium">
                        {level}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Schedule */}
              <View className="p-4">
                <Text className="text-lg font-bold mb-3" style={{ color: colors.charcoal }}>
                  Availability
                </Text>
                {selectedMentor.schedule.map((slot: string, index: number) => (
                  <View key={index} className="flex-row items-center py-2">
                    <Ionicons name="time-outline" size={16} color={colors.indigo} />
                    <Text className="ml-2" style={{ color: colors.grey }}>
                      {slot}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Reviews */}
              <View className="p-4">
                <Text className="text-lg font-bold mb-3" style={{ color: colors.charcoal }}>
                  Reviews ({selectedMentor.reviewCount})
                </Text>
                {selectedMentor.reviews.map((review: any) => (
                  <View key={review.id} className="rounded-xl p-4 mb-3" style={{ backgroundColor: colors.lightGrey }}>
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="font-semibold" style={{ color: colors.charcoal }}>
                        {review.student}
                      </Text>
                      <View className="flex-row items-center">
                        <Ionicons name="star" size={14} color={colors.amber} />
                        <Text className="ml-1 font-medium" style={{ color: colors.charcoal }}>
                          {review.rating}
                        </Text>
                      </View>
                    </View>
                    <Text className="mb-2" style={{ color: colors.grey }}>
                      {review.comment}
                    </Text>
                    <Text className="text-xs" style={{ color: colors.grey }}>
                      {review.date}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Price and Booking */}
              <View className="p-4" style={{ backgroundColor: colors.lightGrey }}>
                <View className="flex-row items-center justify-between mb-4">
                  <View>
                    <Text className="text-sm" style={{ color: colors.grey }}>
                      Starting from
                    </Text>
                    <Text className="text-2xl font-bold" style={{ color: colors.charcoal }}>
                      {selectedMentor.price}/hour
                    </Text>
                  </View>
                  <View className="flex-row space-x-2">
                    <TouchableOpacity
                      className="rounded-full p-3"
                      style={{
                        backgroundColor: colors.white,
                        borderWidth: 1,
                        borderColor: colors.indigo,
                      }}
                    >
                      <Ionicons name="call" size={20} color={colors.indigo} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="rounded-full p-3"
                      style={{
                        backgroundColor: colors.white,
                        borderWidth: 1,
                        borderColor: colors.indigo,
                      }}
                    >
                      <Ionicons name="chatbubble" size={20} color={colors.indigo} />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  className="rounded-2xl py-4 px-6"
                  onPress={() => onBookPress(selectedMentor)}
                  style={{
                    backgroundColor: colors.amber,
                    shadowColor: colors.amber,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                >
                  <Text className="text-center font-bold text-lg" style={{ color: colors.charcoal }}>
                    Book Session Now
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}