"use client"
import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
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

interface LoginScreenProps {
  navigation: {
    navigate: (screen: string) => void
    goBack: () => void
  }
}

// Mock useAuth hook for demonstration
const useAuth = () => ({
  login: async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    if (email === "test@example.com" && password === "password") {
      console.log("Login successful")
    } else {
      throw new Error("Invalid credentials")
    }
  },
  isLoading: false,
})

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { login } = useAuth()

  const handleLogin = async () => {
    setError(null)
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    try {
      setIsLoading(true)
      await login(email, password)
    } catch (err: any) {
      const errorMessage = err.message || "Login failed. Please try again."
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    Alert.alert("Forgot Password", "Password reset functionality coming soon!")
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.indigo }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.indigo} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <LinearGradient
          colors={[colors.indigo, colors.blue, colors.mint]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 24 }}
        >
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-12 left-6 p-2 rounded-full"
            style={{ backgroundColor: `${colors.white}20` }}
          >
            <Ionicons name="chevron-back" size={24} color={colors.white} />
          </TouchableOpacity>

          {/* Logo/Brand Section */}
          <View className="items-center mb-8">
            <View
              className="w-24 h-24 rounded-full items-center justify-center mb-4"
              style={{
                backgroundColor: colors.white,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 10,
              }}
            >
              <Ionicons name="school" size={40} color={colors.indigo} />
            </View>
            <Text className="text-4xl font-bold text-white mb-2">Tolimoo</Text>
            <Text className="text-lg text-white/80 text-center">Welcome back to your learning journey</Text>
          </View>

          {/* Login Form */}
          <View
            className="w-full rounded-3xl p-8"
            style={{
              backgroundColor: colors.white,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 15,
              maxWidth: 400,
            }}
          >
            <Text className="text-2xl font-bold text-center mb-8" style={{ color: colors.charcoal }}>
              Sign In 👋
            </Text>

            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-sm font-semibold mb-2" style={{ color: colors.grey }}>
                Email Address
              </Text>
              <View
                className="flex-row items-center rounded-2xl px-4"
                style={{
                  backgroundColor: colors.lightGrey,
                  borderWidth: 2,
                  borderColor: error && !email ? colors.red : colors.lightGrey,
                }}
              >
                <Ionicons name="mail-outline" size={20} color={colors.grey} />
                <TextInput
                  className="flex-1 ml-3 text-base"
                  style={{
                    color: colors.charcoal,
                    height: 56,
                    fontSize: 16,
                  }}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.grey}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text)
                    setError(null)
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-sm font-semibold mb-2" style={{ color: colors.grey }}>
                Password
              </Text>
              <View
                className="flex-row items-center rounded-2xl px-4"
                style={{
                  backgroundColor: colors.lightGrey,
                  borderWidth: 2,
                  borderColor: error && !password ? colors.red : colors.lightGrey,
                }}
              >
                <Ionicons name="lock-closed-outline" size={20} color={colors.grey} />
                <TextInput
                  className="flex-1 ml-3 text-base"
                  style={{
                    color: colors.charcoal,
                    height: 56,
                    fontSize: 16,
                  }}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.grey}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text)
                    setError(null)
                  }}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={colors.grey} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Error Message */}
            {error && (
              <View className="mb-4 p-3 rounded-xl" style={{ backgroundColor: `${colors.red}20` }}>
                <View className="flex-row items-center">
                  <Ionicons name="alert-circle" size={16} color={colors.red} />
                  <Text className="ml-2 text-sm" style={{ color: colors.red }}>
                    {error}
                  </Text>
                </View>
              </View>
            )}

            {/* Forgot Password */}
            <TouchableOpacity onPress={handleForgotPassword} className="mb-6">
              <Text className="text-right text-sm font-medium" style={{ color: colors.indigo }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className="rounded-2xl p-4"
              style={{
                backgroundColor: isLoading ? colors.grey : colors.amber,
                shadowColor: colors.amber,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              {isLoading ? (
                <View className="flex-row items-center justify-center">
                  <ActivityIndicator color={colors.charcoal} size="small" />
                  <Text className="ml-2 text-lg font-bold" style={{ color: colors.charcoal }}>
                    Signing In...
                  </Text>
                </View>
              ) : (
                <Text className="text-center text-lg font-bold" style={{ color: colors.charcoal }}>
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="items-center mt-8">
            <Text className="text-white/60 text-sm text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
