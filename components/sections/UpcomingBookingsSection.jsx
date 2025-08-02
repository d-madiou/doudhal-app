import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import BookingCard from "../ui/BookingCard";
import { colors } from "../../utils/colors";

const UpcomingBookingsSection = ({ upcomingBookings }) => (
  <View className="mb-6">
    <View className="flex-row items-center justify-between px-4 mb-4">
      <Text className="text-xl font-bold" style={{ color: colors.charcoal }}>
        Upcoming Sessions
      </Text>
      <TouchableOpacity>
        <Text className="text-sm" style={{ color: colors.grey }}>
          View All
        </Text>
      </TouchableOpacity>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
      {upcomingBookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </ScrollView>
  </View>
);

export default UpcomingBookingsSection;