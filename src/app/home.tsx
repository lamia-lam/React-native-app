
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { getTrendingBooks, Book } from "@/services/bookService";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";

export default function HomeScreen() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadBooks = async () => {
        try {
          const data = await getTrendingBooks();
          setBooks(data);
        } catch (error) {
          console.log("Book loading error:", error);
        } finally {
          setLoading(false);
        }
      };

      loadBooks();
    }, []);
    const router = useRouter();


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
              <Pressable key={book.id} style={styles.bookItem}>
                {book.coverUrl ? (
                  <Image
                    source={{ uri: book.coverUrl }}
                    style={styles.bookCover}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.emptyCover}>
                    <Text>📖</Text>
                  </View>
                )}

                <Text style={styles.recommendedTitle} numberOfLines={2}>
                  {book.title}
                </Text>

                <Text style={styles.recommendedAuthor} numberOfLines={1}>
                  {book.author}
                </Text>
              </Pressable>
            ))
          )}
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.tabItem}>
          <Text style={styles.activeTabIcon}>⌂</Text>
          <Text style={styles.activeTabText}>Home</Text>
        </Pressable>

       <Pressable
         style={styles.tabItem}
         onPress={() => router.push("/discover")}>
         <Text style={styles.tabIcon}>⌕</Text>
         <Text style={styles.tabText}>Discover</Text>
       </Pressable>

        <Pressable style={styles.tabItem}>
          <Text style={styles.tabIcon}>▤</Text>
          <Text style={styles.tabText}>Library</Text>
        </Pressable>

        <Pressable style={styles.tabItem}>
          <Text style={styles.tabIcon}>♙</Text>
          <Text style={styles.tabText}>Profile</Text>
        </Pressable>
      </View>
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
  bookItem: {
    width: 112,
  },
  bookCover: {
    width: 112,
    height: 155,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen,
  },
  recommendedTitle: {
    fontFamily: typography.semiBold,
    fontSize: 12,
    color: COLORS.darkGreen,
    marginTop: 8,
  },
  recommendedAuthor: {
    fontFamily: typography.regular,
    fontSize: 10,
    color: COLORS.gray,
    marginTop: 3,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingTop: 10,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 3,
  },
  activeTabIcon: {
    fontSize: 24,
    color: COLORS.primary,
  },
  activeTabText: {
    fontFamily: typography.semiBold,
    fontSize: 10,
    color: COLORS.primary,
  },
  tabIcon: {
    fontSize: 23,
    color: COLORS.gray,
  },
  tabText: {
    fontFamily: typography.medium,
    fontSize: 10,
    color: COLORS.gray,
  },
});
