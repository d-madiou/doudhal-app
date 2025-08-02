import { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

// Import components
import HeaderSection from "../../components/sections/HeaderSection";
import CategoriesSection from "../../components/sections/CategoriesSection";
import CarouselSection from "../../components/sections/CarouselSection";
import TopMentorsSection from "../../components/sections/TopMentorsSection";
import UpcomingBookingsSection from "../../components/sections/UpcomingBookingsSection";
import RecentlyViewedSection from "../../components/sections/RecentlyViewedSection";
import StudyTipsSection from "../../components/sections/StudyTipsSection";
import RequestSubjectSection from "../../components/sections/RequestSubjectSection";
import BottomTabBar from "../../components/ui/BottomTabBar";

// Import hooks and utilities
import { useAuth } from "../../hooks/useAuth";
import { colors } from "../../utils/colors";
import {
  categories,
  carouselData,
  topMentors,
  upcomingBookings,
  recentlyViewed,
} from "../../utils/mockData";

const { width: screenWidth } = Dimensions.get('window');

type HomeScreenProps = {
  navigation: any;
};




export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { user, logout, isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Academic");
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [notificationCount, setNotificationCount] = useState(3);
  const [activeTab, setActiveTab] = useState("Home");
  const carouselRef = useRef<FlatList<any>>(null);

  // Calculate item width more precisely
  const ITEM_MARGIN = 16; // Total horizontal margin (8px on each side)
  const ITEM_WIDTH = screenWidth - ITEM_MARGIN;
  
  const getItemLayout = (_data: any, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  });

  const onCarouselScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / ITEM_WIDTH);
    setCurrentCarouselIndex(index);
  };

  // Carousel auto-scroll
  useEffect(() => {
    if (!carouselData.length) return;
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextIndex = (currentCarouselIndex + 1) % carouselData.length;
        try {
          carouselRef.current.scrollToIndex({ index: nextIndex, animated: true });
          setCurrentCarouselIndex(nextIndex);
        } catch (error) {
          // Handle scrollToIndex error gracefully
          console.log('Carousel scroll error:', error);
        }
      }
    }, 4000);
    return () => clearInterval(interval);
    // Only depend on carouselData.length and currentCarouselIndex
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselData.length, currentCarouselIndex]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.lightGrey }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightGrey} />

      {/* Header Section */}
      <HeaderSection 
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notificationCount={notificationCount}
      />

      {/* Main Content */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Categories Section */}
        <CategoriesSection 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Carousel Section */}
        <CarouselSection 
          carouselData={carouselData}
          carouselRef={carouselRef}
          currentCarouselIndex={currentCarouselIndex}
          onCarouselScroll={onCarouselScroll}
          getItemLayout={getItemLayout}
        />

        {/* Top Mentors Section */}
        <TopMentorsSection topMentors={topMentors} />

        {/* Upcoming Bookings Section */}
        <UpcomingBookingsSection upcomingBookings={upcomingBookings} />

        {/* Recently Viewed Section */}
        <RecentlyViewedSection recentlyViewed={recentlyViewed} />

        {/* Study Tips Section */}
        <StudyTipsSection />

        {/* Request Subject Section */}
        <RequestSubjectSection />
      </ScrollView>

      {/* Bottom Tab Bar */}
    </SafeAreaView>
  );
}