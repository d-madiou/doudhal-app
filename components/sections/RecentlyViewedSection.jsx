import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import RecentMentorCard from "../ui/RecentMentorCard";
import { colors } from "../../utils/colors";

const RecentlyViewedSection = ({ recentlyViewed }) => (
  <View className="mb-6">
    <View className="flex-row items-center justify-between px-4 mb-4">
      <Text className="text-xl font-bold" style={{ color: colors.charcoal }}>
        Recently Viewed
      </Text>
      <TouchableOpacity>
        <Text className="text-sm" style={{ color: colors.grey }}>
          Clear All
        </Text>
      </TouchableOpacity>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
      {recentlyViewed.map((mentor) => (
        <RecentMentorCard key={mentor.id} mentor={mentor} />
      ))}
    </ScrollView>
  </View>
);

export default RecentlyViewedSection;