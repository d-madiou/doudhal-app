import { View, ScrollView } from "react-native";
import CategoryButton from "../ui/CategoryButton";

const CategoriesSection = ({ categories, selectedCategory, setSelectedCategory }) => (
  <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
      {categories.map((category) => (
        <CategoryButton
          key={category.id}
          category={category}
          isSelected={selectedCategory === category.name}
          onPress={() => setSelectedCategory(category.name)}
        />
      ))}
    </ScrollView>
  </View>
);

export default CategoriesSection;