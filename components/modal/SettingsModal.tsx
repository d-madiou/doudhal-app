import React from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Switch,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Color constants
const colors = {
  indigo: "#3F51B5",
  lightGrey: "#F5F5F5",
  white: "#FFFFFF",
  charcoal: "#212121",
  grey: "#757575",
  blue: "#2196F3",
}

interface SettingsModalProps {
  visible: boolean
  onClose: () => void
}

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const InfoCard = ({ title, children }: any) => (
    <View
      className="rounded-2xl p-4 mb-4 mx-4"
      style={{
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <Text className="text-lg font-bold mb-3" style={{ color: colors.charcoal }}>
        {title}
      </Text>
      {children}
    </View>
  )

  const ActionButton = ({ icon, title, subtitle, onPress, color = colors.indigo }: any) => (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-2xl p-4 mb-3 mx-4"
      style={{
        backgroundColor: colors.white,
        borderLeftWidth: 4,
        borderLeftColor: color,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View className="flex-row items-center">
        <View
          className="w-12 h-12 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: `${color}20` }}
        >
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View className="flex-1">
          <Text className="font-bold text-base" style={{ color: colors.charcoal }}>
            {title}
          </Text>
          {subtitle && (
            <Text className="text-sm mt-1" style={{ color: colors.grey }}>
              {subtitle}
            </Text>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.grey} />
      </View>
    </TouchableOpacity>
  )

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.lightGrey }}>
        <View className="flex-row items-center justify-between p-4" style={{ backgroundColor: colors.indigo }}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-white">Settings</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView className="flex-1">
          <InfoCard title="Notifications">
            <View className="flex-row items-center justify-between mb-3">
              <Text style={{ color: colors.charcoal }}>Push Notifications</Text>
              <Switch value={true} onValueChange={() => {}} trackColor={{ true: colors.indigo }} />
            </View>
            <View className="flex-row items-center justify-between mb-3">
              <Text style={{ color: colors.charcoal }}>Email Notifications</Text>
              <Switch value={false} onValueChange={() => {}} trackColor={{ true: colors.indigo }} />
            </View>
            <View className="flex-row items-center justify-between">
              <Text style={{ color: colors.charcoal }}>SMS Notifications</Text>
              <Switch value={true} onValueChange={() => {}} trackColor={{ true: colors.indigo }} />
            </View>
          </InfoCard>

          <InfoCard title="Privacy">
            <View className="flex-row items-center justify-between mb-3">
              <Text style={{ color: colors.charcoal }}>Profile Visibility</Text>
              <Switch value={true} onValueChange={() => {}} trackColor={{ true: colors.indigo }} />
            </View>
            <View className="flex-row items-center justify-between">
              <Text style={{ color: colors.charcoal }}>Show Online Status</Text>
              <Switch value={false} onValueChange={() => {}} trackColor={{ true: colors.indigo }} />
            </View>
          </InfoCard>

          <ActionButton
            icon="help-circle-outline"
            title="Help & Support"
            subtitle="Get help or contact support"
            onPress={() => {}}
            color={colors.blue}
          />

          <ActionButton
            icon="document-text-outline"
            title="Terms & Conditions"
            subtitle="Read our terms and conditions"
            onPress={() => {}}
            color={colors.grey}
          />

          <ActionButton
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            onPress={() => {}}
            color={colors.grey}
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}