import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

const RequestSubjectSection = () => (
  <View className="px-4 mb-8">
    <TouchableOpacity
      className="rounded-2xl p-6 items-center"
      style={{
        backgroundColor: colors.white,
        borderWidth: 2,
        borderColor: colors.indigo,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="rounded-full p-3 mb-3" style={{ backgroundColor: colors.indigo }}>
        <Ionicons name="add-circle" size={24} color={colors.white} />
      </View>
      <Text className="font-bold text-lg mb-2" style={{ color: colors.charcoal }}>
        Cant find your subject?
      </Text>
      <Text className="text-sm text-center mb-4" style={{ color: colors.grey }}>
        Request a new subject and well find qualified mentors for you
      </Text>
      <View className="rounded-full px-6 py-2" style={{ backgroundColor: colors.amber }}>
        <Text className="font-bold" style={{ color: colors.charcoal }}>
          Request Subject
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default RequestSubjectSection;