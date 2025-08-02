import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

const StudyTipsSection = () => (
  <View className="px-4 mb-6">
    <Text className="text-xl font-bold mb-4" style={{ color: colors.charcoal }}>
      Tips for Better Learning
    </Text>
    <View
      className="rounded-2xl p-6"
      style={{
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="flex-row items-center mb-3">
        <View className="rounded-full p-2 mr-3" style={{ backgroundColor: colors.amber }}>
          <Ionicons name="bulb" size={20} color={colors.charcoal} />
        </View>
        <Text className="font-bold text-lg" style={{ color: colors.charcoal }}>
          Study Tip of the Day
        </Text>
      </View>
      <Text className="text-sm leading-5 mb-4" style={{ color: colors.grey }}>
        Take regular breaks during study sessions. The Pomodoro Technique suggests 25 minutes of focused study
        followed by a 5-minute break.
      </Text>
      <View className="flex-row justify-between">
        <TouchableOpacity
          className="rounded-full px-4 py-2 self-start"
          style={{
            backgroundColor: colors.lightGrey,
            borderWidth: 1,
            borderColor: colors.indigo,
          }}
        >
          <Text className="font-semibold text-sm" style={{ color: colors.indigo }}>
            More Tips
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-full px-4 py-2 self-start flex-row space-x-4"
          style={{
            backgroundColor: "bg-gradient-to-r from-violet-500 to-blue-600",
            borderWidth: 1,
            borderColor: colors.indigo,
          }}
        >
          <Ionicons name="help-circle" size={16} color={colors.indigo} />
          <Text className="font-semibold text-sm" style={{ color: colors.indigo }}>
            Ask AI
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default StudyTipsSection;