import React from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../../utils/colors"


interface CardMentorProps {
  mentor: any
  onPress: (mentor: any) => void
  onBookPress: (mentor: any) => void
}

export default function CardMentor({ mentor, onPress, onBookPress }: CardMentorProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress(mentor)}
      className="rounded-2xl p-4 mb-4 mx-4"
      style={{
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="flex-row">
        {/* Profile Image */}
        <View className="relative mr-4">
          <Image
            source={{ uri: mentor.image }}
            className="w-20 h-20 rounded-full"
            style={{ backgroundColor: colors.lightGrey, resizeMode: "cover" }}
          />
          {mentor.isVerified && (
            <View
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.blue }}
            >
              <Ionicons name="checkmark" size={14} color={colors.white} />
            </View>
          )}
        </View>

        {/* Mentor Info */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="font-bold text-lg" style={{ color: colors.charcoal }} numberOfLines={1}>
              {mentor.name}
            </Text>
            <View
              className="px-2 py-1 rounded-full"
              style={{
                backgroundColor: mentor.isAvailable ? colors.green : colors.red,
              }}
            >
              <Text className="text-xs font-medium text-white">{mentor.isAvailable ? "available" : "Busy"}</Text>
            </View>
          </View>

          {/* Rating */}
          <View className="flex-row items-center mb-2">
            <Ionicons name="star" size={16} color={colors.amber} />
            <Text className="font-semibold ml-1" style={{ color: colors.charcoal }}>
              {mentor.rating}
            </Text>
            <Text className="ml-1" style={{ color: colors.grey }}>
              ({mentor.reviewCount} reviews)
            </Text>
          </View>

          {/* Subjects */}
          <View className="flex-row flex-wrap mb-2">
            {mentor.subjects.slice(0, 3).map((subject: string, index: number) => (
              <View
                key={index}
                className="rounded-full px-2 py-1 mr-1 mb-1"
                style={{
                  backgroundColor: index % 2 === 0 ? colors.mint : colors.indigo,
                }}
              >
                <Text className="text-xs font-medium text-white">{subject}</Text>
              </View>
            ))}
          </View>

          {/* Price and Location */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-bold" style={{ color: colors.charcoal }}>
              {mentor.price}/hour
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={14} color={colors.grey} />
              <Text className="text-sm ml-1" style={{ color: colors.grey }}>
                {mentor.location}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-2">
            <TouchableOpacity
              className="flex-1 rounded-full py-2 px-4 mr-2"
              style={{
                backgroundColor: colors.lightGrey,
                borderWidth: 1,
                borderColor: colors.indigo,
              }}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="call-outline" size={16} color={colors.indigo} />
                <Text className="font-semibold ml-1" style={{ color: colors.indigo }}>
                  Contact
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 rounded-full py-2 px-4"
              onPress={() => onBookPress(mentor)}
              style={{
                backgroundColor: colors.amber,
                shadowColor: colors.amber,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="calendar-outline" size={16} color={colors.charcoal} />
                <Text className="font-semibold ml-1" style={{ color: colors.charcoal }}>
                  Book Now
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}