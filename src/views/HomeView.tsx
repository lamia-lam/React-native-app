
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Book, LibraryBook } from "@/models/Book";
import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";
import BottomTabBar from "@/views/components/BottomTabBar";
import BookListCard from "@/views/components/BookListCard";

interface HomeViewProps {
  books: Book[];
  libraryBooks: LibraryBook[];
  loading: boolean;
  handleBookPress: (book: Book | LibraryBook) => void;
  handleTabPress: (tab: string) => void;
}

const BOOKS_PER_PAGE = 6;

export default function HomeView({
  books,
  libraryBooks,
  loading,
  handleBookPress,
  handleTabPress,
}: HomeViewProps) {
  const [currentPage, setCurrentPage] = useState(0);

  // Books with actual reading progress, sorted by latest page update
  const inProgressBooks = libraryBooks
    .filter(
      (book) =>
        book.readingStatus === "Reading" &&
        book.currentPage > 0 &&
        book.totalPages > 0
    )
    .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));

  // Completed books
  const completedBooks = libraryBooks.filter(
    (book) => book.readingStatus === "Completed"
  );

  // Most recently updated reading-progress book
  const latestBook = inProgressBooks[0];

  // Calculate completion percentage
  const progressPercentage = latestBook
    ? Math.min(
        100,
        Math.max(
          0,
          (latestBook.currentPage / latestBook.totalPages) * 100
        )
      )
    : 0;

  // Pagination
  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);

  const startIndex = currentPage * BOOKS_PER_PAGE;

  const displayedBooks = books.slice(
    startIndex,
    startIndex + BOOKS_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((previous) =>
      Math.min(previous + 1, totalPages - 1)
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((previous) =>
      Math.max(previous - 1, 0)
    );
  };

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
            <Text style={styles.statNumber}>{libraryBooks.length}</Text>
            <Text style={styles.statLabel}>Books</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🏆</Text>
            <Text style={styles.statNumber}>{completedBooks.length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statIcon}>📖</Text>
            <Text style={styles.statNumber}>
              {inProgressBooks.length}
            </Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
        </View>

        {/* Continue Reading */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Reading</Text>
        </View>

        {latestBook ? (
          <Pressable
            style={styles.continueCard}
            onPress={() => handleBookPress(latestBook)}
          >
            {latestBook.coverUrl ? (
              <Image
                source={{ uri: latestBook.coverUrl }}
                style={styles.continueCover}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.emptyCover}>
                <Text style={styles.emptyCoverIcon}>📖</Text>
              </View>
            )}

            <View style={styles.continueInfo}>
              <Text style={styles.bookTitle} numberOfLines={2}>
                {latestBook.title}
              </Text>

              <Text style={styles.bookAuthor} numberOfLines={1}>
                {latestBook.author}
              </Text>

              <Text style={styles.progressText}>
                {latestBook.currentPage} / {latestBook.totalPages} pages
              </Text>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progressPercentage}%` },
                  ]}
                />
              </View>

              <Text style={styles.percentageText}>
                {Math.round(progressPercentage)}% completed
              </Text>
            </View>
          </Pressable>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>
              No reading progress yet.
            </Text>
            <Text style={styles.emptySubText}>
              Update the pages you've read to see your latest book here.
            </Text>
          </View>
        )}

        {/* Recommended Books */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>

          <Pressable
            onPress={() => handleTabPress("discover")}
            hitSlop={8}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </Pressable>
        </View>

        {loading ? (
          <Text style={styles.emptySubText}>Loading books...</Text>
        ) : books.length === 0 ? (
          <Text style={styles.emptySubText}>
            No books available. Please try again.
          </Text>
        ) : (
          <>
            {/* Book List */}
            <View style={styles.bookGrid}>
              {displayedBooks.map((book) => (
                <BookListCard
                  key={book.id}
                  book={book}
                  onPress={() => handleBookPress(book)}
                />
              ))}
            </View>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <View style={styles.pagination}>
                <Pressable
                  onPress={handlePreviousPage}
                  disabled={currentPage === 0}
                  style={[
                    styles.pageArrow,
                    currentPage === 0 && styles.disabledArrow,
                  ]}
                >
                  <Text style={styles.arrowText}>‹</Text>
                </Pressable>

                <View style={styles.dotsContainer}>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Pressable
                      key={index}
                      onPress={() => setCurrentPage(index)}
                      style={[
                        styles.pageDot,
                        currentPage === index && styles.activePageDot,
                      ]}
                    />
                  ))}
                </View>

                <Pressable
                  onPress={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  style={[
                    styles.pageArrow,
                    currentPage === totalPages - 1 && styles.disabledArrow,
                  ]}
                >
                  <Text style={styles.arrowText}>›</Text>
                </Pressable>
              </View>
            )}

            {/* Page Number */}
            {totalPages > 1 && (
              <Text style={styles.pageNumber}>
                Page {currentPage + 1} of {totalPages}
              </Text>
            )}
          </>
        )}
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
    marginTop: 5,
  },
  sectionTitle: {
    fontFamily: typography.bold,
    fontSize: 17,
    color: COLORS.darkGreen,
  },
  seeAllText: {
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
  continueCover: {
    width: 82,
    height: 115,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen,
  },
  emptyCover: {
    width: 82,
    height: 115,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen,
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
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  percentageText: {
    fontFamily: typography.regular,
    fontSize: 10,
    color: COLORS.gray,
    marginTop: 5,
  },
  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyText: {
    fontFamily: typography.semiBold,
    fontSize: 13,
    color: COLORS.darkGreen,
  },
  emptySubText: {
    fontFamily: typography.regular,
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 6,
  },
  bookGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 18,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 25,
  },
  pageArrow: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.lightGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledArrow: {
    opacity: 0.3,
  },
  arrowText: {
    fontSize: 27,
    color: COLORS.darkGreen,
    lineHeight: 30,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pageDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  activePageDot: {
    width: 18,
    backgroundColor: COLORS.primary,
  },
  pageNumber: {
    fontFamily: typography.regular,
    fontSize: 10,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 8,
  },
});
