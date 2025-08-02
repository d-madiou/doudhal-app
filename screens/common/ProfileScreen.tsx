"use client"
import { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import EditProfileModal from "../../components/modal/EditProfileModal"
import SettingsModal from "../../components/modal/SettingsModal"
import { colors } from "../../utils/colors"
import {User, ChildProfile, Earning, Receipt} from "../../navigation/types"
// Color constants

interface UserProfileScreenProps {
  navigation: {
    navigate: (screen: string) => void
    goBack: () => void
  }
}


export default function UserProfileScreen({ navigation }: UserProfileScreenProps) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState("")

  // Mock user data - replace with actual user context
  const [user, setUser] = useState<User>({
    id: "1",
    name: "Dr. Fatoumata Bah",
    email: "aisha.khan@email.com",
    phone: "+60123456789",
    role: "mentor", // Change to "parent" or "student" to test different views
    profileImage: "https://i.pinimg.com/736x/9b/e5/6d/9be56d737bf2b96f90fdb9ed4199a509.jpg",
    location: "Kuala Lumpur, Malaysia",
    bio: "Experienced mathematics and physics tutor with PhD in Applied Mathematics. Passionate about helping students excel in their academic journey.",
    subjects: ["Mathematics", "Physics", "Statistics"],
    hourlyRate: 45,
    experience: "8 years",
    isVerified: true,
    joinDate: "2020-03-15",
  })

  // Mock data for different roles
  const childProfiles: ChildProfile[] = [
    {
      id: "1",
      name: "Ahmad Rahman",
      age: 15,
      grade: "Form 3",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "2",
      name: "Sarah Ahmad",
      age: 17,
      grade: "Form 5",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const earnings: Earning[] = [
    {
      id: "1",
      date: "2025-08-01",
      amount: 90,
      student: "Ahmad Rahman",
      subject: "Mathematics",
      status: "paid",
    },
    {
      id: "2",
      date: "2025-08-02",
      amount: 45,
      student: "Sarah Lee",
      subject: "Physics",
      status: "pending",
    },
    {
      id: "3",
      date: "2025-08-03",
      amount: 90,
      student: "Ali Hassan",
      subject: "Mathematics",
      status: "paid",
    },
  ]

  const receipts: Receipt[] = [
    {
      id: "1",
      date: "2025-07-28",
      amount: 45,
      mentor: "Dr. Aisha Khan",
      subject: "Mathematics",
      child: "Ahmad Rahman",
      status: "paid",
    },
    {
      id: "2",
      date: "2025-07-30",
      amount: 50,
      mentor: "Prof. Omar Ali",
      subject: "Quran",
      child: "Sarah Ahmad",
      status: "paid",
    },
  ]

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          // Handle logout logic
          console.log("User logged out")
        },
      },
    ])
  }
  // =========================== field edit functions ===========================

  const handleEditField = (field: string, currentValue: string) => {
    setEditingField(field)
    setTempValue(currentValue)
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    if (editingField && tempValue.trim()) {
      setUser((prev) => ({
        ...prev,
        [editingField]: tempValue.trim(),
      }))
      setShowEditModal(false)
      setEditingField(null)
      setTempValue("")
    }
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setEditingField(null)
    setTempValue("")
  }

  // =========================== field edit functions ===========================

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTotalEarnings = () => {
    return earnings.reduce((total, earning) => total + earning.amount, 0)
  }

  const getPaidEarnings = () => {
    return earnings.filter((e) => e.status === "paid").reduce((total, earning) => total + earning.amount, 0)
  }

  const getPendingEarnings = () => {
    return earnings.filter((e) => e.status === "pending").reduce((total, earning) => total + earning.amount, 0)
  }

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

  const StatCard = ({ title, value, subtitle, color }: any) => (
    <View
      className="flex-1 rounded-2xl p-4 mx-1"
      style={{
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text className="text-sm mb-1" style={{ color: colors.grey }}>
        {title}
      </Text>
      <Text className="text-2xl font-bold mb-1" style={{ color: color }}>
        {value}
      </Text>
      {subtitle && (
        <Text className="text-xs" style={{ color: colors.grey }}>
          {subtitle}
        </Text>
      )}
    </View>
  )

  const EarningItem = ({ earning }: { earning: Earning }) => (
    <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
      <View className="flex-1">
        <Text className="font-semibold" style={{ color: colors.charcoal }}>
          {earning.subject} - {earning.student}
        </Text>
        <Text className="text-sm" style={{ color: colors.grey }}>
          {formatDate(earning.date)}
        </Text>
      </View>
      <View className="items-end">
        <Text className="font-bold text-lg" style={{ color: colors.green }}>
          RM{earning.amount}
        </Text>
        <View
          className="px-2 py-1 rounded-full"
          style={{
            backgroundColor: earning.status === "paid" ? colors.green : colors.orange,
          }}
        >
          <Text className="text-xs font-medium text-white capitalize">{earning.status}</Text>
        </View>
      </View>
    </View>
  )

  const ReceiptItem = ({ receipt }: { receipt: Receipt }) => (
    <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
      <View className="flex-1">
        <Text className="font-semibold" style={{ color: colors.charcoal }}>
          {receipt.subject} with {receipt.mentor}
        </Text>
        <Text className="text-sm" style={{ color: colors.grey }}>
          {receipt.child} • {formatDate(receipt.date)}
        </Text>
      </View>
      <View className="items-end">
        <Text className="font-bold text-lg" style={{ color: colors.charcoal }}>
          RM{receipt.amount}
        </Text>
        <View
          className="px-2 py-1 rounded-full"
          style={{
            backgroundColor: receipt.status === "paid" ? colors.green : colors.orange,
          }}
        >
          <Text className="text-xs font-medium text-white capitalize">{receipt.status}</Text>
        </View>
      </View>
    </View>
  )

  const ChildProfileCard = ({ child }: { child: ChildProfile }) => (
    <TouchableOpacity
      className="rounded-xl p-3 mb-3"
      style={{
        backgroundColor: colors.lightGrey,
        borderWidth: 1,
        borderColor: colors.mint,
      }}
    >
      <View className="flex-row items-center">
        <Image source={{ uri: child.image }} className="w-12 h-12 rounded-full mr-3" />
        <View className="flex-1">
          <Text className="font-semibold" style={{ color: colors.charcoal }}>
            {child.name}
          </Text>
          <Text className="text-sm" style={{ color: colors.grey }}>
            Age {child.age} • {child.grade}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={colors.grey} />
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.lightGrey }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.indigo} />

      {/* Header */}
      <View className="p-4 pb-6" style={{ backgroundColor: colors.indigo }}>
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Profile</Text>
          <TouchableOpacity onPress={() => setShowSettingsModal(true)}>
            <Ionicons name="settings-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* User Info Card */}
        <View
          className="rounded-2xl p-6 mb-4 mx-4"
          style={{
            backgroundColor: colors.white,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <View className="items-center mb-4">
            <View className="relative">
              <Image
                source={{ uri: user.profileImage }}
                className="w-24 h-24 rounded-full"
                style={{ backgroundColor: colors.lightGrey }}
              />
              {user.isVerified && (
                <View
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full items-center justify-center"
                  style={{ backgroundColor: colors.blue }}
                >
                  <Ionicons name="checkmark" size={16} color={colors.white} />
                </View>
              )}
              <TouchableOpacity
                className="absolute -top-1 -left-1 w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.amber }}
              >
                <Ionicons name="camera" size={16} color={colors.charcoal} />
              </TouchableOpacity>
            </View>

            <Text className="text-2xl font-bold mt-3" style={{ color: colors.charcoal }}>
              {user.name}
            </Text>
            <View className="px-3 py-1 rounded-full mt-2" style={{ backgroundColor: `${colors.indigo}20` }}>
              <Text className="font-semibold capitalize" style={{ color: colors.indigo }}>
                {user.role}
              </Text>
            </View>
          </View>

          <View className="space-y-3">
            <TouchableOpacity
              onPress={() => handleEditField("email", user.email)}
              className="flex-row items-center justify-between py-2"
            >
              <View className="flex-row items-center">
                <Ionicons name="mail-outline" size={20} color={colors.grey} />
                <Text className="ml-3" style={{ color: colors.charcoal }}>
                  {user.email}
                </Text>
              </View>
              <Ionicons name="pencil-outline" size={16} color={colors.grey} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleEditField("phone", user.phone)}
              className="flex-row items-center justify-between py-2"
            >
              <View className="flex-row items-center">
                <Ionicons name="call-outline" size={20} color={colors.grey} />
                <Text className="ml-3" style={{ color: colors.charcoal }}>
                  {user.phone}
                </Text>
              </View>
              <Ionicons name="pencil-outline" size={16} color={colors.grey} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleEditField("location", user.location)}
              className="flex-row items-center justify-between py-2"
            >
              <View className="flex-row items-center">
                <Ionicons name="location-outline" size={20} color={colors.grey} />
                <Text className="ml-3" style={{ color: colors.charcoal }}>
                  {user.location}
                </Text>
              </View>
              <Ionicons name="pencil-outline" size={16} color={colors.grey} />
            </TouchableOpacity>

            <View className="flex-row items-center py-2">
              <Ionicons name="calendar-outline" size={20} color={colors.grey} />
              <Text className="ml-3" style={{ color: colors.charcoal }}>
                Joined {formatDate(user.joinDate)}
              </Text>
            </View>
          </View>
        </View>

        {/* Role-Based Content */}
        {user.role === "mentor" && (
          <>
            {/* Mentor Bio */}
            <InfoCard title="About Me">
              <TouchableOpacity onPress={() => handleEditField("bio", user.bio || "")}>
                <Text className="leading-6 mb-2" style={{ color: colors.charcoal }}>
                  {user.bio || "Add a bio to tell students about yourself..."}
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="pencil-outline" size={16} color={colors.indigo} />
                  <Text className="ml-1 font-medium" style={{ color: colors.indigo }}>
                    Edit Bio
                  </Text>
                </View>
              </TouchableOpacity>
            </InfoCard>

            {/* Subjects & Rate */}
            <InfoCard title="Teaching Details">
              <View className="flex-row flex-wrap mb-3">
                {user.subjects?.map((subject, index) => (
                  <View
                    key={index}
                    className="rounded-full px-3 py-1 mr-2 mb-2"
                    style={{
                      backgroundColor: index % 2 === 0 ? colors.mint : colors.indigo,
                    }}
                  >
                    <Text className="text-white font-medium">{subject}</Text>
                  </View>
                ))}
              </View>
              <View className="flex-row items-center justify-between">
                <Text style={{ color: colors.grey }}>Hourly Rate:</Text>
                <TouchableOpacity
                  onPress={() => handleEditField("hourlyRate", user.hourlyRate?.toString() || "")}
                  className="flex-row items-center"
                >
                  <Text className="font-bold text-lg mr-2" style={{ color: colors.charcoal }}>
                    RM{user.hourlyRate}
                  </Text>
                  <Ionicons name="pencil-outline" size={16} color={colors.indigo} />
                </TouchableOpacity>
              </View>
            </InfoCard>

            {/* Earnings Overview */}
            <View className="flex-row mx-4 mb-4">
              <StatCard
                title="Total Earned"
                value={`RM${getTotalEarnings()}`}
                subtitle="All time"
                color={colors.green}
              />
              <StatCard title="This Month" value={`RM${getPaidEarnings()}`} subtitle="Paid" color={colors.indigo} />
              <StatCard
                title="Pending"
                value={`RM${getPendingEarnings()}`}
                subtitle="Awaiting payment"
                color={colors.orange}
              />
            </View>

            {/* Recent Earnings */}
            <InfoCard title="Recent Earnings">
              {earnings.slice(0, 3).map((earning) => (
                <EarningItem key={earning.id} earning={earning} />
              ))}
              <TouchableOpacity className="mt-3">
                <Text className="text-center font-semibold" style={{ color: colors.indigo }}>
                  View All Earnings
                </Text>
              </TouchableOpacity>
            </InfoCard>

            {/* Mentor Actions */}
            <ActionButton
              icon="create-outline"
              title="Edit Profile"
              subtitle="Update your teaching profile and availability"
              onPress={() => {}}
              color={colors.indigo}
            />

            <ActionButton
              icon="calendar-outline"
              title="Manage Bookings"
              subtitle="View and manage your upcoming sessions"
              onPress={() => navigation.navigate("BookingsHistory")}
              color={colors.blue}
            />

            <ActionButton
              icon="analytics-outline"
              title="View Earnings"
              subtitle="Detailed breakdown of your income"
              onPress={() => {}}
              color={colors.green}
            />
          </>
        )}

        {/*=========================parent/student specific content==========================*/}

        {(user.role === "parent" || user.role === "student") && (
          <>
            {/* Child Profiles (for parents) */}
            {user.role === "parent" && (
              <InfoCard title="Child Profiles">
                {childProfiles.map((child) => (
                  <ChildProfileCard key={child.id} child={child} />
                ))}
                <TouchableOpacity
                  className="rounded-xl p-3 items-center"
                  style={{
                    backgroundColor: colors.lightGrey,
                    borderWidth: 2,
                    borderColor: colors.indigo,
                    borderStyle: "dashed",
                  }}
                >
                  <Ionicons name="add-circle-outline" size={24} color={colors.indigo} />
                  <Text className="font-semibold mt-1" style={{ color: colors.indigo }}>
                    Add Child Profile
                  </Text>
                </TouchableOpacity>
              </InfoCard>
            )}

            {/* Recent Receipts */}
            <InfoCard title="Recent Receipts">
              {receipts.slice(0, 3).map((receipt) => (
                <ReceiptItem key={receipt.id} receipt={receipt} />
              ))}
              <TouchableOpacity className="mt-3">
                <Text className="text-center font-semibold" style={{ color: colors.indigo }}>
                  View All Receipts
                </Text>
              </TouchableOpacity>
            </InfoCard>

            {/* Parent/Student Actions */}
            <ActionButton
              icon="create-outline"
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => {}}
              color={colors.indigo}
            />

            <ActionButton
              icon="receipt-outline"
              title="View Receipts"
              subtitle="All your payment receipts and history"
              onPress={() => {}}
              color={colors.blue}
            />

            {user.role === "parent" && (
              <ActionButton
                icon="people-outline"
                title="Manage Children"
                subtitle="Add or edit child profiles"
                onPress={() => {}}
                color={colors.mint}
              />
            )}
          </>
        )}

        {/* Common Actions */}
        <ActionButton
          icon="help-circle-outline"
          title="Help & Support"
          subtitle="Get help or contact our support team"
          onPress={() => {}}
          color={colors.blue}
        />

        <ActionButton
          icon="star-outline"
          title="Rate Our App"
          subtitle="Help us improve by leaving a review"
          onPress={() => {}}
          color={colors.amber}
        />

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="rounded-2xl p-4 mb-8 mx-4"
          style={{
            backgroundColor: colors.red,
            shadowColor: colors.red,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="log-out-outline" size={24} color={colors.white} />
            <Text className="font-bold text-lg ml-2 text-white">Sign Out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Modals */}
      <EditProfileModal
        visible={showEditModal}
        editingField={editingField}
        tempValue={tempValue}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
        onValueChange={setTempValue}
      />
      
      <SettingsModal
        visible={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </SafeAreaView>
  )
}