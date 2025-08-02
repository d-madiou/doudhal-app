import { TouchableOpacity, Text } from "react-native";
import { colors } from "../../utils/colors";

const CategoryButton = ({ category, isSelected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 25,
      marginRight: 12,
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
      style={{
        color: isSelected ? colors.white : colors.indigo,
        fontWeight: '600',
      }}
    >
      {category.icon} {category.name}
    </Text>
  </TouchableOpacity>
);

export default CategoryButton;