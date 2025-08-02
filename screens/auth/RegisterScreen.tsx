"use client"
import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
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

interface RegisterScreenProps {
  navigation: {
    navigate: (screen: string) => void
    goBack: () => void
  }
}

interface RegisterFormData {
  name: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  role: "parent_student" | "mentor"
}

// Mock useAuth hook for demonstration
const useAuth = () => ({
  register: async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Registration successful", data)
  },
  isLoading: false,
})

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "parent_student",
  })
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { register } = useAuth()

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setError(null)
  }

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields")
      return false
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      return false
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    return true
  }

  const handleRegister = async () => {
    setError(null)

    if (!validateForm()) {
      return
    }

    try {
      setIsLoading(true)
      await register({
        email: formData.email,
        password: formData.password,
        password2: formData.confirmPassword,
        name: formData.name,
        phone_number: formData.phoneNumber,
        role: formData.role,
      })
      // Navigation will be handled by AuthContext
    } catch (err: any) {
      let errorMessage = "Registration failed. Please try again."
      try {
        const parsedError = JSON.parse(err.message)
        if (typeof parsedError === "object" && parsedError !== null) {
          errorMessage = Object.values(parsedError).flat().join("\n")
        }
      } catch (parseError) {
        errorMessage = err.message || errorMessage
      }
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const InputField = ({
    label,
    placeholder,
    value,
    onChangeText,
    icon,
    keyboardType = "default",
    secureTextEntry = false,
    showPasswordToggle = false,
    showPassword = false,
    onTogglePassword,
    required = false,
  }: any) => (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, { color: colors.grey }]}>
        {label} {required && <Text style={{ color: colors.red }}>*</Text>}
      </Text>
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.lightGrey,
            borderColor: error && !value && required ? colors.red : colors.lightGrey,
          },
        ]}
      >
        <Ionicons name={icon} size={20} color={colors.grey} />
        <TextInput
          style={[styles.textInput, { color: colors.charcoal }]}
          placeholder={placeholder}
          placeholderTextColor={colors.grey}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={keyboardType === "email-address" ? "none" : "words"}
          autoCorrect={false}
          secureTextEntry={secureTextEntry}
          editable={!isLoading}
        />
        {showPasswordToggle && (
          <TouchableOpacity onPress={onTogglePassword}>
            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={colors.grey} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.indigo }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.indigo} />

      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <LinearGradient
          colors={[colors.indigo, colors.blue, colors.mint]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={colors.white} />
          </TouchableOpacity>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Ionicons name="person-add" size={32} color={colors.indigo} />
              </View>
              <Text style={styles.title}>Join Tolimoo</Text>
              <Text style={styles.subtitle}>Create your account to get started</Text>
            </View>

            {/* Registration Form */}
            <View style={styles.formContainer}>
              {/* Role Selection */}
              <View style={styles.roleSection}>
                <Text style={[styles.roleTitle, { color: colors.charcoal }]}>I am a:</Text>
                <View style={styles.roleButtons}>
                  <TouchableOpacity
                    onPress={() => handleInputChange("role", "parent_student")}
                    style={[
                      styles.roleButton,
                      {
                        backgroundColor: formData.role === "parent_student" ? colors.indigo : colors.lightGrey,
                        borderColor: formData.role === "parent_student" ? colors.indigo : colors.lightGrey,
                      },
                    ]}
                  >
                    <View style={styles.roleButtonContent}>
                      <Ionicons
                        name="school"
                        size={24}
                        color={formData.role === "parent_student" ? colors.white : colors.grey}
                      />
                      <Text
                        style={[
                          styles.roleButtonText,
                          {
                            color: formData.role === "parent_student" ? colors.white : colors.grey,
                          },
                        ]}
                      >
                        Student/Parent
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleInputChange("role", "mentor")}
                    style={[
                      styles.roleButton,
                      {
                        backgroundColor: formData.role === "mentor" ? colors.amber : colors.lightGrey,
                        borderColor: formData.role === "mentor" ? colors.amber : colors.lightGrey,
                      },
                    ]}
                  >
                    <View style={styles.roleButtonContent}>
                      <Ionicons
                        name="person"
                        size={24}
                        color={formData.role === "mentor" ? colors.charcoal : colors.grey}
                      />
                      <Text
                        style={[
                          styles.roleButtonText,
                          {
                            color: formData.role === "mentor" ? colors.charcoal : colors.grey,
                          },
                        ]}
                      >
                        Mentor
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Form Fields */}
              <InputField
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(value: string) => handleInputChange("name", value)}
                icon="person-outline"
                required
              />

              <InputField
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(value: string) => handleInputChange("email", value)}
                icon="mail-outline"
                keyboardType="email-address"
                required
              />

              <InputField
                label="Phone Number"
                placeholder="Enter your phone number (optional)"
                value={formData.phoneNumber}
                onChangeText={(value: string) => handleInputChange("phoneNumber", value)}
                icon="call-outline"
                keyboardType="phone-pad"
              />

              <InputField
                label="Password"
                placeholder="Create a password"
                value={formData.password}
                onChangeText={(value: string) => handleInputChange("password", value)}
                icon="lock-closed-outline"
                secureTextEntry={!showPassword}
                showPasswordToggle
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                required
              />

              <InputField
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(value: string) => handleInputChange("confirmPassword", value)}
                icon="lock-closed-outline"
                secureTextEntry={!showConfirmPassword}
                showPasswordToggle
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                required
              />

              {/* Error Message */}
              {error && (
                <View style={styles.errorContainer}>
                  <View style={styles.errorContent}>
                    <Ionicons name="alert-circle" size={16} color={colors.red} />
                    <Text style={[styles.errorText, { color: colors.red }]}>{error}</Text>
                  </View>
                </View>
              )}

              {/* Register Button */}
              <TouchableOpacity
                onPress={handleRegister}
                disabled={isLoading}
                style={[
                  styles.registerButton,
                  {
                    backgroundColor: isLoading ? colors.grey : colors.indigo,
                  },
                ]}
              >
                {isLoading ? (
                  <View style={styles.loadingContent}>
                    <ActivityIndicator color={colors.white} size="small" />
                    <Text style={styles.loadingText}>Creating Account...</Text>
                  </View>
                ) : (
                  <Text style={styles.registerButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 48,
    left: 24,
    padding: 8,
    borderRadius: 20,
    backgroundColor: `${colors.white}20`,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollViewContent: {
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  formContainer: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  roleSection: {
    marginBottom: 24,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  roleButtons: {
    flexDirection: "row",
    gap: 12,
  },
  roleButton: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
  },
  roleButtonContent: {
    alignItems: "center",
  },
  roleButtonText: {
    fontWeight: "600",
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
  },
  textInput: {
    flex: 1,
    height: 56,
    marginLeft: 12,
    fontSize: 16,
  },
  errorContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: `${colors.red}20`,
  },
  errorContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    marginLeft: 8,
    fontSize: 14,
  },
  registerButton: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.indigo,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  loadingContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  footer: {
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 16,
  },
})
