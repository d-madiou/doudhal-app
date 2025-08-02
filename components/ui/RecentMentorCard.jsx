import { TouchableOpacity, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

const RecentMentorCard = ({ mentor }) => (
  <TouchableOpacity
    className="flex-row items-center rounded-xl p-3 mr-3"
    style={{
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.lightGrey,
    }}
  >
    <Image
      source={{ uri: mentor.image }}
      className="w-12 h-12 rounded-full mr-3"
      style={{ backgroundColor: colors.lightGrey }}
    />
    <View className="flex-1">
      <Text className="font-semibold text-sm" style={{ color: colors.charcoal }} numberOfLines={1}>
        {mentor.name}
      </Text>
      <Text className="text-xs" style={{ color: colors.grey }}>
        {mentor.subject}
      </Text>
      <View className="flex-row items-center mt-1">
        <Ionicons name="star" size={12} color={colors.amber} />
        <Text className="text-xs ml-1" style={{ color: colors.charcoal }}>
          {mentor.rating}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default RecentMentorCard;