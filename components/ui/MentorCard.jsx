import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

const { width } = Dimensions.get("window");
const isTablet = width > 768;


const MentorCard = ({ mentor }) => (
  <View
      className="rounded-2xl p-4 mr-4"
      style={{
        width: isTablet ? 200 : 160,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="items-center mb-3">
        <View className="relative">
          <Image
            source={{ uri: mentor.image }}
            style={{ 
                width: 64, 
                height: 64, 
                borderRadius: 32,
                backgroundColor: colors.lightGrey, 
                resizeMode: "cover" 
                }}
            className="border-2 border-blue-500"
          />
          {mentor.isOnline && (
            <View
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2"
              style={{
                backgroundColor: colors.green,
                borderColor: colors.white,
              }}
            />
          )}
          {mentor.isVerified && (
            <View
              className="absolute -top-1 -left-1 w-5 h-5 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.blue }}
            >
              <Ionicons name="checkmark" size={12} color={colors.white} />
            </View>
          )}
        </View>
        <Text className="font-bold text-sm mt-2 text-center" style={{ color: colors.charcoal }} numberOfLines={1}>
          {mentor.name}
        </Text>
      </View>

      <View className="flex-row items-center justify-center mb-2">
        <Ionicons name="star" size={14} color={colors.amber} />
        <Text className="text-sm font-semibold ml-1" style={{ color: colors.charcoal }}>
          {mentor.rating}
        </Text>
      </View>

      <View className="mb-3 flex-row flex-wrap justify-center">
        {mentor.subjects.slice(0, 1).map((subject, index) => {
            return (
                <View
                    key={index}
                    className="rounded-lg px-3 py-1 m-1"
                    style={{
                        backgroundColor: index % 2 === 0 ? colors.mint : colors.indigo,
                    }}
                >
                    <Text className="text-xs font-medium" style={{ color: colors.white }} numberOfLines={1}>
                        {subject}
                    </Text>
                </View>
            );
        })}
      </View>

      <Text className="font-bold text-center text-sm mb-3" style={{ color: colors.grey }}>
        {mentor.price}
      </Text>

      <TouchableOpacity
        className="rounded-full py-2 px-4"
        style={{
          backgroundColor: colors.amber,
          shadowColor: colors.amber,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text className="font-bold text-center text-sm" style={{ color: colors.charcoal }}>
          Book Now
        </Text>
      </TouchableOpacity>
    </View>
);

export default MentorCard;