import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import MentorCard from "../ui/MentorCard";
import { colors } from "../../utils/colors";

const TopMentorsSection = ({ topMentors }) => (
   <View className="mb-6">
          <View className="flex-row items-center justify-between px-4 mb-4">
            <Text className="text-xl font-bold" style={{ color: colors.charcoal }}>
              Top Mentors
            </Text>
            <TouchableOpacity>
              <Text className="text-sm" style={{ color: colors.grey }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            {topMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </ScrollView>
        </View>
);

export default TopMentorsSection;