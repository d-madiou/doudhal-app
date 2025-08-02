import { View, Text } from "react-native";
import { colors } from "../../utils/colors";

interface Booking {
  mentorName: string;
  status: "confirmed" | "pending" | string;
  subject: string;
  time: string;
}

interface BookingCardProps {
  booking: Booking;
}

const BookingCard = ({ booking }: BookingCardProps) => (
  <View
    className="rounded-xl p-4 mr-3"
    style={{
      width: 200,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.lightGrey,
    }}
  >
    <View className="flex-row items-center justify-between mb-2">
      <Text className="font-semibold text-sm" style={{ color: colors.charcoal }} numberOfLines={1}>
        {booking.mentorName}
      </Text>
      <View
        className="w-2 h-2 rounded-full"
        style={{
          backgroundColor: booking.status === "confirmed" ? colors.green : colors.amber,
        }}
      />
    </View>
    <Text className="text-xs mb-1" style={{ color: colors.grey }}>
      {booking.subject}
    </Text>
    <Text className="text-xs" style={{ color: colors.grey }}>
      {booking.time}
    </Text>
  </View>
);

export default BookingCard;