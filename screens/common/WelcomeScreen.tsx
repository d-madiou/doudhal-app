"use client"
import React from "react"
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  ImageBackground, 
  Dimensions,
  StyleSheet 
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
  darkBlue: "#1A237E",
  lightBlue: "#E3F2FD",
}

interface WelcomeScreenProps {
  navigation: {
    navigate: (screen: string) => void
  }
}

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width,
    height,
  },
  gradient: {
    flex: 1,
  },
  floatingElement: {
    position: 'absolute',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingElement1: {
    top: 80,
    right: 32,
    width: 64,
    height: 64,
    backgroundColor: `${colors.amber}30`,
    shadowColor: colors.amber,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  floatingElement2: {
    top: 160,
    left: 32,
    width: 48,
    height: 48,
    backgroundColor: `${colors.mint}40`,
    shadowColor: colors.mint,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  floatingElement3: {
    top: 240,
    right: 64,
    width: 40,
    height: 40,
    backgroundColor: `${colors.white}25`,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 64,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 80,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: colors.white,
    shadowColor: colors.amber,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 15,
  },
  logoGradient: {
    width: 112,
    height: 112,
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appNameContainer: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 2,
  },
  underline: {
    height: 4,
    width: 120,
    borderRadius: 2,
    marginBottom: 16,
    backgroundColor: colors.amber,
    shadowColor: colors.amber,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  welcomeText1: {
    fontSize: 24,
    color: `${colors.white}F2`,
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    fontWeight: '300',
  },
  welcomeText2: {
    fontSize: 24,
    color: `${colors.white}F2`,
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 24,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 18,
    color: `${colors.white}CC`,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  middleSection: {
    alignItems: 'center',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: `${colors.white}20`,
  },
  featureText: {
    color: `${colors.white}CC`,
    fontSize: 18,
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 8,
  },
  loginButton: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: colors.amber,
    shadowColor: colors.amber,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  loginGradient: {
    borderRadius: 24,
    padding: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  loginButtonText: {
    color: colors.charcoal,
  },
  registerButton: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonText: {
    color: colors.indigo,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    color: `${colors.white}99`,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
  },
})

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const handleNavigateToLogin = () => {
    navigation.navigate("Login")
  }

  const handleNavigateToRegister = () => {
    navigation.navigate("Register")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.indigo} />

      <ImageBackground
        source={{ uri: "/placeholder.svg?height=800&width=400" }}
        style={[styles.backgroundImage, { backgroundColor: colors.lightGrey }]}
        resizeMode="cover"
      >
        {/* Beautiful Gradient Overlay */}
        <LinearGradient
          colors={[`${colors.indigo}CC`, `${colors.indigo}E6`, `${colors.indigo}B3`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          {/* Remove floating elements */}

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              {/* App Logo with Glow Effect */}
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <LinearGradient
                    colors={[colors.indigo, colors.blue]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.logoGradient}
                  >
                    <Ionicons name="school" size={48} color={colors.white} />
                  </LinearGradient>
                </View>

                {/* App Name with Stylish Typography */}
                <View style={styles.appNameContainer}>
                  <Text style={styles.appName}>Tolimoo</Text>
                  <View style={styles.underline} />
                </View>
              </View>

              {/* Welcome Message */}
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText1}>Unlock Your Learning</Text>
                <Text style={styles.welcomeText2}>Potential Today</Text>
                
              </View>
            </View>

          

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              {/* Login Button */}
              <TouchableOpacity
                onPress={handleNavigateToLogin}
                style={styles.loginButton}
                activeOpacity={0.8}
              >
                <View style={styles.loginButton}>
                  <View style={styles.buttonContent}>
                    <Ionicons name="log-in" size={24} color={colors.charcoal} />
                    <Text style={[styles.buttonText, styles.loginButtonText]}>
                      Sign In
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Register Button */}
              <TouchableOpacity
                onPress={handleNavigateToRegister}
                style={styles.registerButton}
                activeOpacity={0.8}
              >
                <View style={styles.buttonContent}>
                  <Ionicons name="person-add" size={24} color={colors.indigo} />
                  <Text style={[styles.buttonText, styles.registerButtonText]}>
                    Create Account
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Footer Text */}
              <Text style={styles.footerText}>
                By continuing, you agree to our Terms of Service and Privacy Policy
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  )
}