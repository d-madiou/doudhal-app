"use client"
import { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  ActivityIndicator,
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
}

interface BookingScreenProps {
  navigation: {
    navigate: (screen: string) => void
    goBack: () => void
  }
  route: {
    params: {
      mentor: any
      selectedSubject?: string
    }
  }
}

interface AvailabilitySlot {
  id: string
  date: string
  startTime: string
  endTime: string
  isAvailable: boolean
  price: number
}

interface ChildProfile {
  id: string
  name: string
  age: number
  grade: string
  image?: string
}

export default function BookingScreen({ navigation, route }: BookingScreenProps) {
  const { mentor, selectedSubject } = route.params

  // Booking form state
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null)
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null)
  const [selectedSubjectState, setSelectedSubjectState] = useState<string>(selectedSubject || "")
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("online")
  const [specialRequests, setSpecialRequests] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - replace with actual API calls
  const availabilitySlots: AvailabilitySlot[] = [
    {
      id: "1",
      date: "2025-08-05",
      startTime: "09:00",
      endTime: "10:00",
      isAvailable: true,
      price: 40,
    },
    {
      id: "2",
      date: "2025-08-05",
      startTime: "10:00",
      endTime: "11:00",
      isAvailable: true,
      price: 40,
    },
    {
      id: "3",
      date: "2025-08-06",
      startTime: "14:00",
      endTime: "15:00",
      isAvailable: true,
      price: 40,
    },
    {
      id: "4",
      date: "2025-08-06",
      startTime: "15:00",
      endTime: "16:00",
      isAvailable: false,
      price: 40,
    },
    {
      id: "5",
      date: "2025-08-07",
      startTime: "16:00",
      endTime: "17:00",
      isAvailable: true,
      price: 40,
    },
  ]

  const childProfiles: ChildProfile[] = [
    {
      id: "1",
      name: "Ahmad Rahman",
      age: 15,
      grade: "Form 3",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "2",
      name: "Sarah Ahmad",
      age: 17,
      grade: "Form 5",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "3",
      name: "Ali Hassan",
      age: 13,
      grade: "Form 1",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const subjects = mentor.subjects || []

  const calculateTotalCost = () => {
    return selectedSlot ? selectedSlot.price : 0
  }

  const handleBooking = async () => {
    if (!selectedSlot || !selectedChild || !selectedSubjectState) {
      Alert.alert("Missing Information", "Please fill in all required fields")
      return
    }

    setIsLoading(true)
    try {
      // Mock API call - replace with actual booking API
      const bookingData = {
        mentor_id: mentor.id,
        child_profile_id: selectedChild.id,
        mentor_availability_slot_id: selectedSlot.id,
        subject: selectedSubjectState,
        payment_method: paymentMethod,
        total_cost: calculateTotalCost(),
        special_requests: specialRequests,
      }

      console.log("Booking data:", bookingData)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      Alert.alert("Booking Successful!", "Your booking has been submitted and is pending mentor approval.", [
        {
          text: "View Bookings",
          onPress: () => navigation.navigate("BookingsHistory"),
        },
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ])
    } catch (error) {
      Alert.alert("Booking Failed", "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
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

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const AvailabilitySlotCard = ({ slot }: { slot: AvailabilitySlot }) => (
    <TouchableOpacity
      onPress={() => slot.isAvailable && setSelectedSlot(slot)}
      disabled={!slot.isAvailable}
      className="rounded-2xl p-4 mb-3 mx-4"
      style={{
        backgroundColor: selectedSlot?.id === slot.id ? colors.indigo : colors.white,
        borderWidth: selectedSlot?.id === slot.id ? 2 : 1,
        borderColor: selectedSlot?.id === slot.id ? colors.indigo : colors.lightGrey,
        opacity: slot.isAvailable ? 1 : 0.5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text
            className="font-medium text-sm mb-1"
            style={{
              color: selectedSlot?.id === slot.id ? colors.white : colors.grey,
            }}
          >
            {formatDate(slot.date)}
          </Text>
          <Text
            className="font-bold text-lg"
            style={{
              color: selectedSlot?.id === slot.id ? colors.white : colors.charcoal,
            }}
          >
            {slot.startTime} - {slot.endTime}
          </Text>
          <Text
            className="text-sm mt-1"
            style={{
              color: selectedSlot?.id === slot.id ? colors.white : colors.grey,
            }}
          >
            1 hour session
          </Text>
        </View>
        <View className="items-end">
          <Text
            className="font-bold text-xl"
            style={{
              color: selectedSlot?.id === slot.id ? colors.white : colors.charcoal,
            }}
          >
            RM{slot.price}
          </Text>
          {!slot.isAvailable && (
            <View className="bg-red-100 rounded-full px-2 py-1 mt-1">
              <Text className="text-xs font-medium" style={{ color: colors.red }}>
                Unavailable
              </Text>
            </View>
          )}
          {selectedSlot?.id === slot.id && (
            <View className="flex-row items-center mt-1">
              <Ionicons name="checkmark-circle" size={16} color={colors.white} />
              <Text className="text-xs ml-1 text-white font-medium">Selected</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )

  const ChildProfileCard = ({ child }: { child: ChildProfile }) => (
    <TouchableOpacity
      onPress={() => setSelectedChild(child)}
      className="rounded-2xl p-4 mb-3 mx-4"
      style={{
        backgroundColor: selectedChild?.id === child.id ? colors.mint : colors.white,
        borderWidth: selectedChild?.id === child.id ? 2 : 1,
        borderColor: selectedChild?.id === child.id ? colors.mint : colors.lightGrey,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="flex-row items-center">
        <Image
          source={{ uri: child.image }}
          className="w-14 h-14 rounded-full mr-3"
          style={{ backgroundColor: colors.lightGrey }}
        />
        <View className="flex-1">
          <Text
            className="font-bold text-lg"
            style={{
              color: selectedChild?.id === child.id ? colors.white : colors.charcoal,
            }}
          >
            {child.name}
          </Text>
          <Text
            className="text-sm"
            style={{
              color: selectedChild?.id === child.id ? colors.white : colors.grey,
            }}
          >
            Age {child.age} • {child.grade}
          </Text>
        </View>
        {selectedChild?.id === child.id && <Ionicons name="checkmark-circle" size={24} color={colors.white} />}
      </View>
    </TouchableOpacity>
  )

  const SubjectChip = ({ subject, isSelected, onPress }: any) => (
    <TouchableOpacity
      onPress={onPress}
      className="px-4 py-2 rounded-full mr-3 mb-2"
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

  const PaymentMethodCard = ({ method, title, icon, description }: any) => (
    <TouchableOpacity
      onPress={() => setPaymentMethod(method)}
      className="rounded-2xl p-4 mb-3 mx-4"
      style={{
        backgroundColor: paymentMethod === method ? colors.amber : colors.white,
        borderWidth: paymentMethod === method ? 2 : 1,
        borderColor: paymentMethod === method ? colors.amber : colors.lightGrey,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="flex-row items-center">
        <View
          className="w-12 h-12 rounded-full items-center justify-center mr-3"
          style={{
            backgroundColor: paymentMethod === method ? colors.charcoal : colors.lightGrey,
          }}
        >
          <Ionicons name={icon} size={20} color={paymentMethod === method ? colors.amber : colors.grey} />
        </View>
        <View className="flex-1">
          <Text
            className="font-bold text-lg"
            style={{
              color: paymentMethod === method ? colors.charcoal : colors.charcoal,
            }}
          >
            {title}
          </Text>
          <Text
            className="text-sm"
            style={{
              color: paymentMethod === method ? colors.charcoal : colors.grey,
            }}
          >
            {description}
          </Text>
        </View>
        {paymentMethod === method && <Ionicons name="checkmark-circle" size={24} color={colors.charcoal} />}
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.lightGrey }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.indigo} />

      {/* Header */}
      <View className="flex-row items-center justify-between p-4" style={{ backgroundColor: colors.indigo }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">Book Session</Text>
        <TouchableOpacity>
          <Ionicons name="help-circle-outline" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Mentor Info */}
        <View className="p-4 mb-4" style={{ backgroundColor: colors.white }}>
          <View className="flex-row items-center">
            <Image
              source={{ uri: mentor.image }}
              className="w-16 h-16 rounded-full mr-4"
              style={{ backgroundColor: colors.lightGrey }}
            />
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="font-bold text-xl" style={{ color: colors.charcoal }}>
                  {mentor.name}
                </Text>
                {mentor.isVerified && (
                  <View className="ml-2 bg-blue-500 rounded-full p-1">
                    <Ionicons name="checkmark" size={12} color={colors.white} />
                  </View>
                )}
              </View>
              <View className="flex-row items-center mt-1">
                <Ionicons name="star" size={16} color={colors.amber} />
                <Text className="font-semibold ml-1" style={{ color: colors.charcoal }}>
                  {mentor.rating}
                </Text>
                <Text className="ml-1" style={{ color: colors.grey }}>
                  ({mentor.reviewCount} reviews)
                </Text>
              </View>
              <Text className="mt-1" style={{ color: colors.grey }}>
                {mentor.location} • {mentor.experience} experience
              </Text>
            </View>
          </View>
        </View>

        {/* Select Child */}
        <View className="mb-4">
          <Text className="text-lg font-bold mb-3 px-4" style={{ color: colors.charcoal }}>
            Select Child Profile
          </Text>
          {childProfiles.map((child) => (
            <ChildProfileCard key={child.id} child={child} />
          ))}
        </View>

        {/* Select Subject */}
        <View className="mb-4">
          <Text className="text-lg font-bold mb-3 px-4" style={{ color: colors.charcoal }}>
            Select Subject
          </Text>
          <View className="flex-row flex-wrap px-4">
            {subjects.map((subject: string, index: number) => (
              <SubjectChip
                key={index}
                subject={subject}
                isSelected={selectedSubjectState === subject}
                onPress={() => setSelectedSubjectState(subject)}
              />
            ))}
          </View>
        </View>

        {/* Select Time Slot */}
        <View className="mb-4">
          <Text className="text-lg font-bold mb-3 px-4" style={{ color: colors.charcoal }}>
            Available Time Slots
          </Text>
          {availabilitySlots.map((slot) => (
            <AvailabilitySlotCard key={slot.id} slot={slot} />
          ))}
        </View>

        {/* Payment Method */}
        <View className="mb-4">
          <Text className="text-lg font-bold mb-3 px-4" style={{ color: colors.charcoal }}>
            Payment Method
          </Text>
          <PaymentMethodCard
            method="online"
            title="Online Payment"
            icon="card-outline"
            description="Pay securely with credit/debit card"
          />
          <PaymentMethodCard
            method="cash"
            title="Cash Payment"
            icon="cash-outline"
            description="Pay cash during the session"
          />
        </View>

        {/* Special Requests */}
        <View className="mb-4 mx-4">
          <Text className="text-lg font-bold mb-3" style={{ color: colors.charcoal }}>
            Special Requests (Optional)
          </Text>
          <View
            className="rounded-2xl p-4"
            style={{
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.lightGrey,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <TextInput
              className="text-base"
              style={{
                color: colors.charcoal,
                minHeight: 80,
                textAlignVertical: "top",
              }}
              placeholder="Any specific topics you'd like to focus on or special requirements..."
              placeholderTextColor={colors.grey}
              value={specialRequests}
              onChangeText={setSpecialRequests}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Booking Summary */}
        <View
          className="mx-4 rounded-2xl p-4 mb-4"
          style={{
            backgroundColor: colors.white,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <Text className="text-lg font-bold mb-3" style={{ color: colors.charcoal }}>
            Booking Summary
          </Text>

          {selectedChild && (
            <View className="flex-row justify-between mb-2">
              <Text style={{ color: colors.grey }}>Student:</Text>
              <Text className="font-medium" style={{ color: colors.charcoal }}>
                {selectedChild.name}
              </Text>
            </View>
          )}

          {selectedSubjectState && (
            <View className="flex-row justify-between mb-2">
              <Text style={{ color: colors.grey }}>Subject:</Text>
              <Text className="font-medium" style={{ color: colors.charcoal }}>
                {selectedSubjectState}
              </Text>
            </View>
          )}

          {selectedSlot && (
            <>
              <View className="flex-row justify-between mb-2">
                <Text style={{ color: colors.grey }}>Date:</Text>
                <Text className="font-medium" style={{ color: colors.charcoal }}>
                  {formatFullDate(selectedSlot.date)}
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text style={{ color: colors.grey }}>Time:</Text>
                <Text className="font-medium" style={{ color: colors.charcoal }}>
                  {selectedSlot.startTime} - {selectedSlot.endTime}
                </Text>
              </View>
            </>
          )}

          <View className="flex-row justify-between mb-2">
            <Text style={{ color: colors.grey }}>Payment:</Text>
            <Text className="font-medium" style={{ color: colors.charcoal }}>
              {paymentMethod === "online" ? "Online Payment" : "Cash Payment"}
            </Text>
          </View>

          <View
            className="flex-row justify-between mt-3 pt-3"
            style={{ borderTopWidth: 1, borderTopColor: colors.lightGrey }}
          >
            <Text className="font-bold text-lg" style={{ color: colors.charcoal }}>
              Total Cost:
            </Text>
            <Text className="font-bold text-xl" style={{ color: colors.indigo }}>
              RM{calculateTotalCost()}
            </Text>
          </View>
        </View>

        {/* Book Button */}
        <View className="p-4 pb-8">
          <TouchableOpacity
            onPress={handleBooking}
            disabled={!selectedSlot || !selectedChild || !selectedSubjectState || isLoading}
            className="rounded-2xl py-4 px-6"
            style={{
              backgroundColor:
                !selectedSlot || !selectedChild || !selectedSubjectState || isLoading ? colors.grey : colors.amber,
              shadowColor: colors.amber,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            {isLoading ? (
              <View className="flex-row items-center justify-center">
                <ActivityIndicator color={colors.charcoal} size="small" />
                <Text className="text-center font-bold text-lg ml-2" style={{ color: colors.charcoal }}>
                  Processing...
                </Text>
              </View>
            ) : (
              <Text className="text-center font-bold text-lg" style={{ color: colors.charcoal }}>
                Confirm Booking - RM{calculateTotalCost()}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
