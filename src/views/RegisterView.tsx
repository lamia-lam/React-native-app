import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";

interface RegisterViewProps {
  fullName: string;
  setFullName: (text: string) => void;
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  confirmPassword: string;
  setConfirmPassword: (text: string) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  loading: boolean;
  handleRegister: () => void;
  navigateToLogin: () => void;
}

export default function RegisterView({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  toggleShowPassword,
  loading,
  handleRegister,
  navigateToLogin,
}: RegisterViewProps) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Heading */}
          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.subtitle}>
            Start your reading journey with BookBuddy.
          </Text>

          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#8A9A91"
              autoCapitalize="words"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#8A9A91"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Create a password"
                placeholderTextColor="#8A9A91"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />

              <Pressable onPress={toggleShowPassword}>
                <Text style={styles.showText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Re-enter your password"
              placeholderTextColor="#8A9A91"
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* Create Account Button */}
          <Pressable
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.registerButtonText}>
              {loading ? "Creating Account..." : "Create Account"}
            </Text>
          </Pressable>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?{" "}
            </Text>

            <Pressable onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Sign In</Text>
            </Pressable>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mint,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 15,
    paddingBottom: 30,
    alignItems: "center",
  },

  logo: {
    width: 160,
    height: 160,
    marginBottom: -20,
  },

  title: {
    fontFamily: typography.bold,
    fontSize: 28,
    color: COLORS.darkGreen,
    marginBottom: 8,
  },

  subtitle: {
    fontFamily: typography.regular,
    fontSize: 14,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 20,
  },

  inputContainer: {
    width: "100%",
    marginBottom: 12,
  },

  label: {
    fontFamily: typography.medium,
    fontSize: 14,
    color: COLORS.darkGreen,
    marginBottom: 8,
  },

  input: {
    backgroundColor: COLORS.white,
    height: 54,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontFamily: typography.regular,
    fontSize: 14,
    color: COLORS.darkGreen,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  passwordContainer: {
    backgroundColor: COLORS.white,
    height: 54,
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  passwordInput: {
    flex: 1,
    fontFamily: typography.regular,
    fontSize: 14,
    color: COLORS.darkGreen,
  },

  showText: {
    fontFamily: typography.medium,
    color: COLORS.green,
    fontSize: 13,
  },

  registerButton: {
    width: "100%",
    height: 54,
    backgroundColor: COLORS.green,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  registerButtonText: {
    fontFamily: typography.bold,
    color: COLORS.white,
    fontSize: 16,
  },

  loginContainer: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center",
  },

  loginText: {
    fontFamily: typography.regular,
    fontSize: 13,
    color: COLORS.gray,
  },

  loginLink: {
    fontFamily: typography.bold,
    fontSize: 13,
    color: COLORS.green,
  },
});
