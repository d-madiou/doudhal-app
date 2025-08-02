"use client"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Color constants
const colors = {
  indigo: "#3F51B5",
  amber: "#FFC107",
  lightGrey: "#F5F5F5",
  white: "#FFFFFF",
  green: "#4CAF50",
  charcoal: "#212121",
  grey: "#757575",
  blue: "#2196F3",
  mint: "#4DB6AC",
  red: "#F44336",
  orange: "#FF9800",
}

interface ChatScreenProps {
  navigation: {
    navigate: (screen: string) => void
    goBack: () => void
  }
}

interface Chat {
  id: number
  participant: string
  role: "mentor" | "student" | "parent"
  lastMessage: string
  time: string
  avatar: string
  isOnline: boolean
  unreadCount: number
  subject?: string
}

export default function ChatScreen({ navigation }: ChatScreenProps) {
  const [activeTab, setActiveTab] = useState("Chat")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Enhanced dummy chat data
  const dummyChats: Chat[] = [
    {
      id: 1,
      participant: "Dr. Aisha Khan",
      role: "mentor",
      lastMessage: "Great progress in today's math session! Keep practicing those equations.",
      time: "2h ago",
      avatar: "/placeholder.svg?height=50&width=50",
      isOnline: true,
      unreadCount: 2,
      subject: "Mathematics",
    },
    {
      id: 2,
      participant: "Prof. Omar Ali",
      role: "mentor",
      lastMessage: "Jazakallahu khairan for the Quran session! See you next week.",
      time: "5h ago",
      avatar: "/placeholder.svg?height=50&width=50",
      isOnline: false,
      unreadCount: 0,
      subject: "Quran",
    },
    {
      id: 3,
      participant: "Ms. Sarah Johnson",
      role: "mentor",
      lastMessage: "Your English essay was excellent! I've sent some feedback.",
      time: "Yesterday",
      avatar: "/placeholder.svg?height=50&width=50",
      isOnline: true,
      unreadCount: 1,
      subject: "English",
    },
    {
      id: 4,
      participant: "Ahmad Rahman",
      role: "student",
      lastMessage: "Thank you for the physics help! The concepts are clearer now.",
      time: "2 days ago",
      avatar: "/placeholder.svg?height=50&width=50",
      isOnline: false,
      unreadCount: 0,
      subject: "Physics",
    },
    {
      id: 5,
      participant: "Dr. Hassan Mohamed",
      role: "mentor",
      lastMessage: "Don't forget to review the chemistry notes before our next session.",
      time: "3 days ago",
      avatar: "/placeholder.svg?height=50&width=50",
      isOnline: true,
      unreadCount: 0,
      subject: "Chemistry",
    },
  ]

  const tabs = [
    { id: "Home", name: "Home", icon: "home" },
    { id: "Mentor", name: "Mentor", icon: "people" },
    { id: "Booking", name: "Booking", icon: "calendar" },
    { id: "Chat", name: "Chat", icon: "chatbubbles" },
    { id: "Profile", name: "Profile", icon: "person" },
  ]

  useEffect(() => {
    const fetchChats = async () => {
      setIsLoading(true)
      console.log("Fetching chat list...")
      await new Promise((resolve) => setTimeout(resolve, 800))
      setChats(dummyChats)
      setIsLoading(false)
    }
    fetchChats()
  }, [])

  const filteredChats = chats.filter(
    (chat) =>
      chat.participant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (chat.subject && chat.subject.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const totalUnreadCount = chats.reduce((total, chat) => total + chat.unreadCount, 0)

  const handleChatPress = (chat: Chat) => {
    Alert.alert("Open Chat", `Opening conversation with ${chat.participant}`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Open",
        onPress: () => {
          console.log(`Opening chat with ${chat.participant} (ID: ${chat.id})`)
          // TODO: Navigate to chat conversation screen
          // navigation.navigate('ChatConversation', { chatId: chat.id, participant: chat.participant })
        },
      },
    ])
  }

  const handleStartNewChat = () => {
    Alert.alert("New Chat", "Start a new conversation by booking a mentor first!", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Find Mentors",
        onPress: () => navigation.navigate("Mentor"),
      },
    ])
  }

  const ChatItem = ({ chat }: { chat: Chat }) => (
    <TouchableOpacity
      onPress={() => handleChatPress(chat)}
      className="rounded-2xl p-4 mb-3 mx-4"
      style={{
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View className="flex-row items-center">
        {/* Avatar with Online Status */}
        <View className="relative mr-3">
          <Image
            source={{ uri: chat.avatar }}
            className="w-14 h-14 rounded-full"
            style={{ backgroundColor: colors.lightGrey }}
          />
          {chat.isOnline && (
            <View
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
              style={{
                backgroundColor: colors.green,
                borderColor: colors.white,
              }}
            />
          )}
        </View>

        {/* Chat Info */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="font-bold text-base" style={{ color: colors.charcoal }} numberOfLines={1}>
              {chat.participant}
            </Text>
            <Text className="text-xs" style={{ color: colors.grey }}>
              {chat.time}
            </Text>
          </View>

          {/* Subject Badge */}
          {chat.subject && (
            <View className="mb-1">
              <View
                className="rounded-full px-2 py-1 self-start"
                style={{
                  backgroundColor: chat.role === "mentor" ? colors.indigo : colors.mint,
                }}
              >
                <Text className="text-xs font-medium text-white">{chat.subject}</Text>
              </View>
            </View>
          )}

          {/* Last Message */}
          <Text className="text-sm leading-5" style={{ color: colors.grey }} numberOfLines={2}>
            {chat.lastMessage}
          </Text>
        </View>

        {/* Unread Badge */}
        {chat.unreadCount > 0 && (
          <View
            className="w-6 h-6 rounded-full items-center justify-center ml-2"
            style={{ backgroundColor: colors.red }}
          >
            <Text className="text-xs font-bold text-white">{chat.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  const BottomTabBar = () => (
    <View
      className="flex-row justify-around items-center py-2"
      style={{
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.lightGrey,
        paddingBottom: 20,
      }}
    >
      {tabs.map((tab) => (
        <TouchableOpacity key={tab.id} onPress={() => setActiveTab(tab.id)} className="items-center py-2 px-3">
          <View className="relative">
            <Ionicons name={tab.icon as any} size={24} color={activeTab === tab.id ? colors.indigo : colors.grey} />
            {tab.id === "Chat" && totalUnreadCount > 0 && (
              <View
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.red }}
              >
                <Text className="text-xs font-bold text-white">{totalUnreadCount}</Text>
              </View>
            )}
          </View>
          <Text
            className="text-xs mt-1 font-medium"
            style={{
              color: activeTab === tab.id ? colors.indigo : colors.grey,
            }}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.lightGrey }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.indigo} />

      {/* Header */}
      <View className="p-4 pb-6" style={{ backgroundColor: colors.indigo }}>
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-white">Messages</Text>
          <TouchableOpacity onPress={handleStartNewChat} className="p-2 rounded-full bg-white/20">
            <Ionicons name="add" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row items-center">
          <View className="flex-row items-center mr-6">
            <Ionicons name="chatbubbles" size={16} color={colors.white} />
            <Text className="text-white/80 ml-1">{chats.length} conversations</Text>
          </View>
          {totalUnreadCount > 0 && (
            <View className="flex-row items-center">
              <Ionicons name="notifications" size={16} color={colors.amber} />
              <Text className="ml-1" style={{ color: colors.amber }}>
                {totalUnreadCount} unread
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-4 mb-4">
        <View className="flex-row items-center rounded-2xl px-4" style={{ backgroundColor: colors.white }}>
          <Ionicons name="search-outline" size={20} color={colors.grey} />
          <TextInput
            className="flex-1 h-12 ml-3"
            style={{ color: colors.charcoal }}
            placeholder="Search conversations..."
            placeholderTextColor={colors.grey}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color={colors.grey} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Chat List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color={colors.indigo} />
            <Text className="mt-4 text-base" style={{ color: colors.grey }}>
              Loading conversations...
            </Text>
          </View>
        ) : filteredChats.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <View
              className="w-20 h-20 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: colors.white }}
            >
              <Ionicons name="chatbubbles-outline" size={40} color={colors.grey} />
            </View>
            <Text className="text-xl font-bold mb-2" style={{ color: colors.charcoal }}>
              {searchQuery ? "No conversations found" : "No active chats"}
            </Text>
            <Text className="text-center px-8 mb-6" style={{ color: colors.grey }}>
              {searchQuery ? "Try adjusting your search terms" : "Start a conversation by booking a mentor session"}
            </Text>
            {!searchQuery && (
              <TouchableOpacity
                onPress={handleStartNewChat}
                className="rounded-full px-6 py-3"
                style={{
                  backgroundColor: colors.amber,
                  shadowColor: colors.amber,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <View className="flex-row items-center">
                  <Ionicons name="person-add" size={20} color={colors.charcoal} />
                  <Text className="font-bold ml-2" style={{ color: colors.charcoal }}>
                    Find Mentors
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View className="pb-4">
            {filteredChats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Quick Actions */}
      {!isLoading && filteredChats.length > 0 && (
        <View className="px-4 pb-4">
          <TouchableOpacity
            onPress={handleStartNewChat}
            className="rounded-2xl p-4"
            style={{
              backgroundColor: colors.white,
              borderWidth: 2,
              borderColor: colors.indigo,
              borderStyle: "dashed",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="add-circle-outline" size={24} color={colors.indigo} />
              <Text className="font-semibold text-base ml-2" style={{ color: colors.indigo }}>
                Start New Conversation
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Tab Navigation */}
      <BottomTabBar />
    </SafeAreaView>
  )
}
