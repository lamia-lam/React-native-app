
import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { User as FirebaseUser } from "firebase/auth";

import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";
import BottomTabBar from "@/views/components/BottomTabBar";

interface ProfileViewProps {
  user: FirebaseUser | null;
  totalBooks: number;
  readingBooks: number;
  completedBooks: number;
  isLoading: boolean;
  onLogout: () => void;
  isLoggingOut: boolean;
  onEditProfile: () => void;
}

export default function ProfileView({
  user,
  totalBooks,
  readingBooks,
  completedBooks,
  isLoading,
  onLogout,
  isLoggingOut,
  onEditProfile,
}: ProfileViewProps) {
  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "Reader";

  const confirmLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: onLogout,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Profile 👤</Text>
        <Text style={styles.subtitle}>
          Your personal reading space
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {firstName.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.name}>{firstName}</Text>

          <Text style={styles.email}>
            {user?.email || "No email available"}
          </Text>

          <Text style={styles.memberLabel}>
            BookBuddy Reader
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Reading Statistics 📚
        </Text>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
          />
        ) : (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {totalBooks}
              </Text>
              <Text style={styles.statLabel}>
                Total Books
              </Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {readingBooks}
              </Text>
              <Text style={styles.statLabel}>
                Reading
              </Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {completedBooks}
              </Text>
              <Text style={styles.statLabel}>
                Completed
              </Text>
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>
          Menu
        </Text>

        <View style={styles.menuCard}>
          <Pressable
            style={({ pressed }) => [
              styles.menuRow,
              pressed && styles.menuPressed,
            ]}
            onPress={onEditProfile}
          >
            <Text style={styles.menuIcon}>✏️</Text>
            <Text style={styles.menuLabel}>
              Edit Profile
            </Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>

          <View style={styles.menuDivider} />

          <Pressable
            style={({ pressed }) => [
              styles.menuRow,
              pressed && styles.menuPressed,
              isLoggingOut && styles.disabledButton,
            ]}
            onPress={confirmLogout}
            disabled={isLoggingOut}
          >
            <Text style={styles.menuIcon}>🚪</Text>
            <Text style={styles.menuLabel}>
              {isLoggingOut ? "Logging out..." : "Log Out"}
            </Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>
      </View>

      <BottomTabBar activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 15,
    paddingBottom: 18,
  },
  heading: {
    fontFamily: typography.bold,
    fontSize: 25,
    color: COLORS.darkGreen,
  },
  subtitle: {
    fontFamily: typography.regular,
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.lightGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: typography.bold,
    fontSize: 30,
    color: COLORS.darkGreen,
  },
  name: {
    fontFamily: typography.bold,
    fontSize: 20,
    color: COLORS.darkGreen,
    marginTop: 12,
  },
  email: {
    fontFamily: typography.regular,
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 5,
  },
  memberLabel: {
    fontFamily: typography.medium,
    fontSize: 11,
    color: COLORS.primary,
    marginTop: 9,
  },
  sectionTitle: {
    fontFamily: typography.semiBold,
    fontSize: 16,
    color: COLORS.darkGreen,
    marginTop: 20,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statNumber: {
    fontFamily: typography.bold,
    fontSize: 23,
    color: COLORS.primary,
  },
  statLabel: {
    fontFamily: typography.medium,
    fontSize: 10,
    color: COLORS.gray,
    marginTop: 5,
    textAlign: "center",
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  menuPressed: {
    opacity: 0.6,
  },
  menuIcon: {
    fontSize: 20,
    width: 35,
  },
  menuLabel: {
    flex: 1,
    fontFamily: typography.medium,
    fontSize: 14,
    color: COLORS.darkGreen,
  },
  chevron: {
    fontSize: 27,
    color: COLORS.gray,
  },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
