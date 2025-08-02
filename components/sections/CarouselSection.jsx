import { View, FlatList, Dimensions } from "react-native";
import CarouselItem from "../ui/CarouselItem";
import { colors } from "../../utils/colors";

const { width: screenWidth } = Dimensions.get('window');

const CarouselSection = ({ 
  carouselData, 
  carouselRef, 
  currentCarouselIndex, 
  onCarouselScroll,
  getItemLayout 
}) => {
  const ITEM_MARGIN = 16;
  const ITEM_WIDTH = screenWidth - ITEM_MARGIN;

  return (
    <View style={{ marginBottom: 20 }}>
      <FlatList
        ref={carouselRef}
        data={carouselData}
        renderItem={({ item }) => (
          <CarouselItem item={item} itemWidth={ITEM_WIDTH} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH}
        snapToAlignment="start"
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={onCarouselScroll}
        removeClippedSubviews={false}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={7}
        bounces={false}
        scrollEventThrottle={16}
      />
      {/* Carousel Indicators */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16
      }}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={{
              width: currentCarouselIndex === index ? 12 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: currentCarouselIndex === index ? colors.indigo : colors.grey,
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default CarouselSection;