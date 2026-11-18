import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Book } from "@/models/Book";
import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";
import BottomTabBar from "@/views/components/BottomTabBar";
import BookListCard from "@/views/components/BookListCard";

interface HomeViewProps {
  books: Book[];
  loading: boolean;
  handleTabPress: (tab: string) => void;
}

export default function HomeView({
  books,
  loading,
  handleTabPress,
}: HomeViewProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Reader! 👋</Text>
            <Text style={styles.subtitle}>
              Let's explore some books today.
            </Text>
          </View>

          <Pressable style={styles.avatar}>
            <Text style={styles.avatarText}>R</Text>
          </Pressable>
        </View>

        {/* Reading Statistics */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>📚</Text>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Books</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🏆</Text>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statIcon}>⏱️</Text>
            <Text style={styles.statNumber}>0h</Text>
            <Text style={styles.statLabel}>Reading Time</Text>
          </View>
        </View>

        {/* Continue Reading */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Reading</Text>
          <Pressable>
            <Text style={styles.seeAll}>See all ›</Text>
          </Pressable>
        </View>

        <Pressable style={styles.continueCard}>
          <View style={styles.emptyCover}>
            <Text style={styles.emptyCoverIcon}>📖</Text>
          </View>

          <View style={styles.continueInfo}>
            <Text style={styles.bookTitle}>No book in progress</Text>
            <Text style={styles.bookAuthor}>
              Start reading a book from your library.
            </Text>
            <Text style={styles.progressText}>Your progress will appear here</Text>
            <View style={styles.progressBackground}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </Pressable>

        {/* Recommended Books */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <Pressable>
            <Text style={styles.seeAll}>See all ›</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bookList}
        >
          {loading ? (
            <Text style={styles.bookAuthor}>Loading books...</Text>
          ) : books.length === 0 ? (
            <Text style={styles.bookAuthor}>
              No books available. Please try again.
            </Text>
          ) : (
            books.map((book) => (
              <BookListCard key={book.id} book={book} />
            ))
          )}
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTabBar activeTab="home" onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greeting: {
    fontFamily: typography.bold,
    fontSize: 23,
    color: COLORS.darkGreen,
  },
  subtitle: {
    fontFamily: typography.regular,
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 5,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.lightGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: typography.bold,
    fontSize: 19,
    color: COLORS.darkGreen,
  },
  statsCard: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 28,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statIcon: {
    fontSize: 21,
    marginBottom: 7,
  },
  statNumber: {
    fontFamily: typography.bold,
    fontSize: 21,
    color: COLORS.white,
  },
  statLabel: {
    fontFamily: typography.medium,
    fontSize: 10,
    color: COLORS.white,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 48,
    backgroundColor: "#41615D",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: typography.bold,
    fontSize: 17,
    color: COLORS.darkGreen,
  },
  seeAll: {
    fontFamily: typography.semiBold,
    fontSize: 12,
    color: COLORS.primary,
  },
  continueCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    marginBottom: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyCover: {
    width: 82,
    height: 115,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCoverIcon: {
    fontSize: 32,
  },
  continueInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  bookTitle: {
    fontFamily: typography.semiBold,
    fontSize: 14,
    color: COLORS.darkGreen,
  },
  bookAuthor: {
    fontFamily: typography.regular,
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 5,
  },
  progressText: {
    fontFamily: typography.medium,
    fontSize: 10,
    color: COLORS.primary,
    marginTop: 14,
  },
  progressBackground: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 10,
    marginTop: 7,
  },
  progressFill: {
    width: "0%",
    height: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  bookList: {
    gap: 14,
    paddingBottom: 10,
  },
});
