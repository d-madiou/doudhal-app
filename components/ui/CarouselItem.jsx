import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../utils/colors";

const CarouselItem = ({ item, itemWidth }) => (
  <View style={{ width: itemWidth, paddingHorizontal: 8 }}>
    <LinearGradient
      colors={item.backgroundColor}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 16,
        padding: 24,
        height: 192,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      <Text style={{
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8
      }}>
        {item.title}
      </Text>
      <Text style={{
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 16,
        marginBottom: 16,
        lineHeight: 22
      }}>
        {item.subtitle}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: colors.amber,
          borderRadius: 25,
          paddingHorizontal: 24,
          paddingVertical: 10,
          alignSelf: 'flex-start'
        }}
      >
        <Text style={{
          color: colors.charcoal,
          fontWeight: '600',
          fontSize: 14
        }}>
          Learn More
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
);

export default CarouselItem;