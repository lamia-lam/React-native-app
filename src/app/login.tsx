
import React, { useState } from "react";
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
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "@/services/authService";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing Information", "Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await loginUser(email.trim(), password);

      Alert.alert("Success", "Welcome back to BookBuddy!");

      router.replace("/home");
    } catch (error: any) {
      let message = "Something went wrong. Please try again.";

      if (error.code === "auth/invalid-credential") {
        message = "Incorrect email or password.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (error.code === "auth/user-disabled") {
        message = "This account has been disabled.";
      }

      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

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
          <Text style={styles.title}>Welcome Back!</Text>

          <Text style={styles.subtitle}>
            Continue your reading journey with BookBuddy.
          </Text>

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
                placeholder="Enter your password"
                placeholderTextColor="#8A9A91"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />

              <Pressable
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.showText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Forgot Password */}
          <Pressable style={styles.forgotContainer}>
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </Pressable>

          {/* Sign In Button */}
          <Pressable
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? "Signing In..." : "Sign In"}
            </Text>
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          {/* Google Button */}
          <Pressable style={styles.googleButton}>
            <Text style={styles.googleText}>
              Continue with Google
            </Text>
          </Pressable>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Don't have an account?{" "}
            </Text>

            <Pressable onPress={() => router.push("/register")}>
              <Text style={styles.registerLink}>
                Sign Up
              </Text>
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
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: "center",
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom:-40,
  },

  title: {
    fontFamily: typography.bold,
    fontSize: 28,
    color: COLORS.darkGreen,
    marginBottom: 10,
  },

  subtitle: {
    fontFamily: typography.regular,
    fontSize: 14,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 25,
  },

  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },

  label: {
    fontFamily: typography.medium,
    fontSize: 14,
    color: COLORS.darkGreen,
    marginBottom: 9,
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

  forgotContainer: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },

  forgotText: {
    fontFamily: typography.medium,
    color: COLORS.green,
    fontSize: 13,
  },

  loginButton: {
    width: "100%",
    height: 54,
    backgroundColor: COLORS.green,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  loginButtonText: {
    fontFamily: typography.bold,
    color: COLORS.white,
    fontSize: 16,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 25,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },

  orText: {
    fontFamily: typography.medium,
    color: COLORS.gray,
    marginHorizontal: 15,
    fontSize: 12,
  },

  googleButton: {
    width: "100%",
    height: 54,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  googleText: {
    fontFamily: typography.medium,
    color: COLORS.darkGreen,
    fontSize: 14,
  },

  registerContainer: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
  },

  registerText: {
    fontFamily: typography.regular,
    fontSize: 13,
    color: COLORS.gray,
  },

  registerLink: {
    fontFamily: typography.bold,
    fontSize: 13,
    color: COLORS.green,
  },
});
