"use client"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Color constants
const colors = {
  indigo: "#3F51B5",
  amber: "#FFC107",
  lightGrey: "#F5F5F5",
  white: "#FFFFFF",
  green: "#4CAF50",
  charcoal: "#212121",
  grey: "#757575",
  blue: "#2196F3",
  mint: "#4DB6AC",
  red: "#F44336",
  orange: "#FF9800",
  purple: "#9C27B0",
}

interface BookingsHistoryScreenProps {
  navigation: {
    navigate: (screen: string) => void
    goBack: () => void
  }
}

interface Booking {
  id: number
  mentor: string
  mentorImage: string
  subject: string
  date: string
  time: string
  status: "upcoming" | "current" | "past" | "pending" | "cancelled" | "completed"
  cost: number
  childName: string
  location: string
  rating?: number
}

export default function BookingsHistoryScreen({ navigation }: BookingsHistoryScreenProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "current" | "past" | "pending" | "cancelled">("upcoming")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [bookings, setBookings] = useState<Booking[]>([])

  // Mock booking data
  const dummyBookings: Booking[] = [
    {
      id: 1,
      mentor: "Dr. Aisha Khan",
      mentorImage: "/placeholder.svg?height=60&width=60",
      subject: "Mathematics",
      date: "2025-08-05",
      time: "09:00 AM",
      status: "upcoming",
      cost: 50,
      childName: "Ahmad Rahman",
      location: "Kuala Lumpur",
    },
    {
      id: 2,
      mentor: "Mr. David Lee",
      mentorImage: "/placeholder.svg?height=60&width=60",
      subject: "English",
      date: "2025-07-28",
      time: "02:00 PM",
      status: "past",
      cost: 45,
      childName: "Sarah Ahmad",
      location: "Petaling Jaya",
      rating: 5,
    },
    {
      id: 3,
      mentor: "Ustaz Omar",
      mentorImage: "/placeholder.svg?height=60&width=60",
      subject: "Quran",
      date: "2025-08-10",
      time: "11:00 AM",
      status: "upcoming",
      cost: 60,
      childName: "Ali Hassan",
      location: "Shah Alam",
    },
    {
      id: 4,
      mentor: "Ms. Sarah Chen",
      mentorImage: "/placeholder.svg?height=60&width=60",
      subject: "Physics",
      date: "2025-07-31",
      time: "04:00 PM",
      status: "current",
      cost: 55,
      childName: "Ahmad Rahman",
      location: "Subang Jaya",
    },
    {
      id: 5,
      mentor: "Dr. Hassan Mohamed",
      mentorImage: "/placeholder.svg?height=60&width=60",
      subject: "Chemistry",
      date: "2025-07-30",
      time: "09:00 AM",
      status: "past",
      cost: 50,
      childName: "Sarah Ahmad",
      location: "Kuala Lumpur",
      rating: 4,
    },
    {
      id: 6,
      mentor: "Prof. Ahmad Ali",
      mentorImage: "/placeholder.svg?height=60&width=60",
      subject: "History",
      date: "2025-08-01",
      time: "03:00 PM",
      status: "cancelled",
      cost: 45,
      childName: "Ali Hassan",
      location: "Petaling Jaya",
    },
    {
      id: 7,
      mentor: "Ms. Fatima Hassan",
      mentorImage: "/placeholder.svg?height=60&width=60",
      subject: "Arabic",
      date: "2025-08-15",
      time: "10:00 AM",
      status: "pending",
      cost: 60,
      childName: "Ahmad Rahman",
      location: "Shah Alam",
    },
  ]

  const tabs = [
    { id: "upcoming", name: "Upcoming", icon: "calendar-outline", count: 2 },
    { id: "current", name: "Current", icon: "play-circle-outline", count: 1 },
    { id: "past", name: "Past", icon: "checkmark-circle-outline", count: 2 },
    { id: "pending", name: "Pending", icon: "time-outline", count: 1 },
    { id: "cancelled", name: "Cancelled", icon: "close-circle-outline", count: 1 },
  ]

  // Effect to fetch bookings whenever the activeTab changes
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true)
      console.log(`Fetching bookings for status: ${activeTab}`)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Filter dummy data based on active tab
      const filteredBookings = dummyBookings.filter((booking) => booking.status === activeTab)
      setBookings(filteredBookings)
      setIsLoading(false)
    }

    fetchBookings()
  }, [activeTab])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return colors.blue
      case "current":
        return colors.green
      case "past":
        return colors.grey
      case "pending":
        return colors.orange
      case "cancelled":
        return colors.red
      case "completed":
        return colors.purple
      default:
        return colors.grey
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return "calendar-outline"
      case "current":
        return "play-circle"
      case "past":
        return "checkmark-circle"
      case "pending":
        return "time"
      case "cancelled":
        return "close-circle"
      default:
        return "help-circle"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const handleCancelBooking = (bookingId: number) => {
    Alert.alert("Cancel Booking", "Are you sure you want to cancel this booking?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes, Cancel",
        style: "destructive",
        onPress: () => {
          // Handle cancellation logic here
          Alert.alert("Booking Cancelled", "Your booking has been cancelled successfully.")
        },
      },
    ])
  }

  const handleJoinSession = (booking: Booking) => {
    Alert.alert("Join Session", `Ready to join your ${booking.subject} session with ${booking.mentor}?`, [
      { text: "Not Yet", style: "cancel" },
      {
        text: "Join Now",
        onPress: () => {
          // Handle join session logic here
          console.log("Joining session:", booking.id)
        },
      },
    ])
  }

  const handleLeaveReview = (booking: Booking) => {
    // Navigate to review screen or show review modal
    Alert.alert("Leave Review", `How was your session with ${booking.mentor}?`)
  }

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <View
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
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getStatusColor(booking.status) }} />
          <Text className="font-bold text-lg" style={{ color: colors.charcoal }}>
            {booking.subject}
          </Text>
        </View>
        <View className="px-3 py-1 rounded-full" style={{ backgroundColor: `${getStatusColor(booking.status)}20` }}>
          <Text className="text-xs font-semibold capitalize" style={{ color: getStatusColor(booking.status) }}>
            {booking.status}
          </Text>
        </View>
      </View>

      {/* Mentor Info */}
      <View className="flex-row items-center mb-3">
        <Image
          source={{ uri: booking.mentorImage }}
          className="w-12 h-12 rounded-full mr-3"
          style={{ backgroundColor: colors.lightGrey }}
        />
        <View className="flex-1">
          <Text className="font-semibold" style={{ color: colors.charcoal }}>
            {booking.mentor}
          </Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="location-outline" size={12} color={colors.grey} />
            <Text className="text-xs ml-1" style={{ color: colors.grey }}>
              {booking.location}
            </Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="font-bold text-lg" style={{ color: colors.charcoal }}>
            RM{booking.cost}
          </Text>
          {booking.rating && (
            <View className="flex-row items-center mt-1">
              <Ionicons name="star" size={12} color={colors.amber} />
              <Text className="text-xs ml-1" style={{ color: colors.grey }}>
                {booking.rating}/5
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Session Details */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={14} color={colors.grey} />
          <Text className="text-sm ml-1" style={{ color: colors.grey }}>
            {formatDate(booking.date)} at {booking.time}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="person-outline" size={14} color={colors.grey} />
          <Text className="text-sm ml-1" style={{ color: colors.grey }}>
            {booking.childName}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row space-x-2">
        {booking.status === "upcoming" && (
          <>
            <TouchableOpacity
              onPress={() => handleCancelBooking(booking.id)}
              className="flex-1 rounded-full py-2 px-4 mr-2"
              style={{
                backgroundColor: colors.lightGrey,
                borderWidth: 1,
                borderColor: colors.red,
              }}
            >
              <Text className="text-center font-semibold text-sm" style={{ color: colors.red }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 rounded-full py-2 px-4"
              style={{
                backgroundColor: colors.blue,
                shadowColor: colors.blue,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text className="text-center font-semibold text-sm text-white">View Details</Text>
            </TouchableOpacity>
          </>
        )}

        {booking.status === "current" && (
          <TouchableOpacity
            onPress={() => handleJoinSession(booking)}
            className="flex-1 rounded-full py-2 px-4"
            style={{
              backgroundColor: colors.green,
              shadowColor: colors.green,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="videocam" size={16} color={colors.white} />
              <Text className="text-center font-semibold text-sm text-white ml-1">Join Session</Text>
            </View>
          </TouchableOpacity>
        )}

        {booking.status === "past" && (
          <TouchableOpacity
            onPress={() => handleLeaveReview(booking)}
            className="flex-1 rounded-full py-2 px-4"
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
              <Ionicons name="star-outline" size={16} color={colors.charcoal} />
              <Text className="text-center font-semibold text-sm" style={{ color: colors.charcoal }}>
                Leave Review
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {booking.status === "pending" && (
          <View className="flex-1 items-center py-2">
            <Text className="text-sm" style={{ color: colors.orange }}>
              Waiting for mentor confirmation...
            </Text>
          </View>
        )}

        {booking.status === "cancelled" && (
          <TouchableOpacity
            className="flex-1 rounded-full py-2 px-4"
            style={{
              backgroundColor: colors.lightGrey,
              borderWidth: 1,
              borderColor: colors.indigo,
            }}
          >
            <Text className="text-center font-semibold text-sm" style={{ color: colors.indigo }}>
              Book Again
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )

  const TabButton = ({ tab, isActive, onPress }: any) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 items-center py-3 px-2"
      style={{
        backgroundColor: isActive ? colors.indigo : "transparent",
        borderRadius: 12,
      }}
    >
      <View className="items-center">
        <View className="relative">
          <Ionicons name={tab.icon} size={20} color={isActive ? colors.white : colors.grey} />
          {tab.count > 0 && (
            <View
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.amber }}
            >
              <Text className="text-xs font-bold" style={{ color: colors.charcoal }}>
                {tab.count}
              </Text>
            </View>
          )}
        </View>
        <Text className="text-xs font-medium mt-1" style={{ color: isActive ? colors.white : colors.grey }}>
          {tab.name}
        </Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.lightGrey }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.indigo} />

      {/* Header */}
      <View className="p-4 pb-6" style={{ backgroundColor: colors.indigo }}>
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">My Bookings</Text>
          <TouchableOpacity>
            <Ionicons name="filter-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        <Text className="text-white/80 text-center">View and manage your sessions</Text>
      </View>

      {/* Tab Navigation */}
      <View
        className="flex-row mx-4 mb-4 p-2 rounded-2xl"
        style={{
          backgroundColor: colors.white,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onPress={() => setActiveTab(tab.id as any)}
          />
        ))}
      </View>

      {/* Bookings List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color={colors.indigo} />
            <Text className="mt-4 text-lg" style={{ color: colors.grey }}>
              Loading bookings...
            </Text>
          </View>
        ) : bookings.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <View
              className="w-20 h-20 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: colors.lightGrey }}
            >
              <Ionicons name={getStatusIcon(activeTab)} size={40} color={colors.grey} />
            </View>
            <Text className="text-xl font-bold mb-2" style={{ color: colors.charcoal }}>
              No {activeTab} bookings
            </Text>
            <Text className="text-center px-8" style={{ color: colors.grey }}>
              {activeTab === "upcoming" ? "Book a session to see it here!" : "Check other tabs or book a new session."}
            </Text>
            {activeTab === "upcoming" && (
              <TouchableOpacity
                onPress={() => navigation.navigate("Mentor")}
                className="mt-6 rounded-full px-6 py-3"
                style={{
                  backgroundColor: colors.amber,
                  shadowColor: colors.amber,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <Text className="font-bold" style={{ color: colors.charcoal }}>
                  Find a Mentor
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View className="pb-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
