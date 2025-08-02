import { NavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

// --- Auth Stack Parameter List ---
// For screens in the authentication flow (Login, Register)
export type AuthStackParamList = {
  Welcome: undefined; // New screen for unauthenticated users
  Login: undefined;
  Register: undefined;
  
};

// --- Nested Stack for Mentors Tab ---
// This stack will manage navigation within the 'Mentors' tab (List -> Detail)
export type MentorStackParamList = {
  MentorList: { category?: string } | undefined; // The main list of mentors, can receive category
  MentorDetail: { mentorId: number }; // Details of a specific mentor
};

// --- Main Bottom Tab Navigator Parameter List ---
// This defines the tabs that will be visible at the bottom of the authenticated app
export type MainTabParamList = {
  Home: undefined; // The main home screen (HomeScreen.tsx)
  Mentors: undefined; // This tab will contain the MentorStack (MentorList, MentorDetail)
  Bookings: undefined; // Screen to view bookings (BookingsScreen.tsx)
  Chat: undefined; // Screen for chat conversations (ChatScreen.tsx)
  Profile: undefined; // User profile screen (ProfileScreen.tsx)
};

// --- App Root Stack Parameter List ---
// This stack sits above the tabs and handles authentication flow or full-screen modals
// In your types file
export type AppStackParamList = {
  AuthFlow: undefined;
  MainTabs: undefined;
  userProfile: undefined; // Screen for user profile management
  BookingScreen: {
    mentor: any;
    selectedSubject?: string;
  };
  // BookingHistory
  BookingsScreen: {
    mentor: any;
    selectedSubject?: string;
  };
};


// --- Screen Props for individual components ---

// For screens within AuthStack
export type WelcomeScreenProps = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;
export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

// For screens within MainTabNavigator
// CompositeScreenProps allows screens within tabs to also navigate the root AppStack
export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<AppStackParamList>
>;
export type BookingsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Bookings'>,
  NativeStackScreenProps<AppStackParamList>
>;
export type ChatScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Chat'>,
  NativeStackScreenProps<AppStackParamList>
>;
export type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Profile'>,
  NativeStackScreenProps<AppStackParamList>
>;

// For screens within MentorStack (nested inside 'Mentors' tab)
export type MentorListScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MentorStackParamList, 'MentorList'>,
  BottomTabScreenProps<MainTabParamList, 'Mentors'> // Allows navigation back to tabs
>;
export type MentorDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MentorStackParamList, 'MentorDetail'>,
  BottomTabScreenProps<MainTabParamList, 'Mentors'> // Allows navigation back to tabs
>;


// --- Generic Navigation Prop Types (for useNavigation hook) ---
// These are useful if you need to access navigation from components not directly rendered as screens
export type AuthStackNavigationProp = NavigationProp<AuthStackParamList>;
export type AppStackNavigationProp = NavigationProp<AppStackParamList>;
export type MainTabNavigationProp = NavigationProp<MainTabParamList>;
export type MentorStackNavigationProp = NavigationProp<MentorStackParamList>;

// User profile interfaces
export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "parent" | "student" | "mentor"
  profileImage: string
  location: string
  bio?: string
  subjects?: string[]
  hourlyRate?: number
  experience?: string
  isVerified: boolean
  joinDate: string
}

export interface ChildProfile {
  id: string
  name: string
  age: number
  grade: string
  image: string
}

export interface Earning {
  id: string
  date: string
  amount: number
  student: string
  subject: string
  status: "paid" | "pending"
}

export interface Receipt {
  id: string
  date: string
  amount: number
  mentor: string
  subject: string
  child: string
  status: "paid" | "pending"
}

