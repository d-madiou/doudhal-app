import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabParamList, MentorStackParamList } from './types';
import BottomTabBar from '../components/ui/BottomTabBar';

// Screens - import from absolute paths
import HomeScreen from '../screens/common/HomeScreen';
import BookingsScreen from '../screens/common/BookingsScreen';
import ChatScreen from '../screens/common/ChatScreen';
import ProfileScreen from '../screens/common/ProfileScreen';
import MentorListScreen from '../screens/common/MentorListScreen';
import MentorDetailScreen from '../screens/common/MentorDetailScreen';

// Components

// Create navigators after all imports
const MainTab = createBottomTabNavigator<MainTabParamList>();
const MentorStack = createNativeStackNavigator<MentorStackParamList>();

function MentorsStackNavigator() {
  return (
    <MentorStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3B82F6' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <MentorStack.Screen
        name="MentorList"
        component={MentorListScreen}
        options={{ title: 'Find Mentors' }}
      />
      <MentorStack.Screen
        name="MentorDetail"
        component={MentorDetailScreen}
        options={{ title: 'Mentor Profile' }}
      />
    </MentorStack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <MainTab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <MainTab.Screen name="Mentors" component={MentorsStackNavigator} options={{ title: 'Mentors' }} />
      <MainTab.Screen name="Bookings" component={BookingsScreen} options={{ title: 'Bookings' }} />
      <MainTab.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
      <MainTab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </MainTab.Navigator>
  );
}