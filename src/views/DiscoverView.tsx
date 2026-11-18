
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Book } from "@/models/Book";
import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";
import BottomTabBar from "@/views/components/BottomTabBar";
import BookCard from "@/views/components/BookCard";
import BookListCard from "@/views/components/BookListCard";

interface DiscoverViewProps {
  searchQuery: string;
  openBookDetails: (book: Book) => void;
  handleSearchChange: (text: string) => void;
  handleSearch: () => void;
  searchResults: Book[];
  isSearching: boolean;
  trendingBooks: Book[];
  isLoadingTrending: boolean;
  categories: string[];
  selectedCategory: string | null;
  handleCategoryPress: (category: string) => void;
  handleTabPress: (tab: string) => void;
}

export default function DiscoverView({
  searchQuery,
  handleSearchChange,
  handleSearch,
  searchResults,
  isSearching,
  trendingBooks,
  isLoadingTrending,
  categories,
  selectedCategory,
  handleCategoryPress,
  handleTabPress,
  openBookDetails,
}: DiscoverViewProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>Discover Books</Text>
          <Text style={styles.subtitle}>
            Find your next favorite read.
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search books or authors..."
            placeholderTextColor={COLORS.gray}
            value={searchQuery}
            onChangeText={handleSearchChange}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
        </View>

        <View style={styles.categoryContainer}>
          {categories.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <Pressable
                key={category}
                onPress={() => handleCategoryPress(category)}
                style={[
                  styles.categoryChip,
                  isSelected && styles.selectedCategoryChip,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Search and Category Results */}
        {isSearching ? (
          <Text style={styles.subtitle}>Searching books...</Text>
        ) : searchQuery.trim() !== "" ? (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedCategory
                  ? `${selectedCategory} Books`
                  : "Search Results"}
              </Text>

              {searchResults.length > 0 && (
                <Text style={styles.resultCount}>
                  {searchResults.length} books found
                </Text>
              )}
            </View>

            {searchResults.length > 0 ? (
              searchResults.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onPress={() => openBookDetails(book)}
                />
              ))
            ) : (
              <Text style={styles.subtitle}>
                No books found. Try another category or search.
              </Text>
            )}
          </View>
        ) : null}

        {/* Trending Books and Popular Reads */}
        {searchQuery.trim() === "" && (
          <>
            {/* Trending Books */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending Books</Text>

              <Pressable>
                <Text style={styles.seeAll}>See all ›</Text>
              </Pressable>
            </View>

            {isLoadingTrending ? (
              <Text style={styles.subtitle}>
                Loading trending books...
              </Text>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.bookList}
              >
                {trendingBooks.map((book) => (
                  <BookListCard
                    key={book.id}
                    book={book}
                    onPress={() => openBookDetails(book)}
                  />
                ))}
              </ScrollView>
            )}

            {/* Popular Reads */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Reads</Text>

              <Pressable>
                <Text style={styles.seeAll}>See all ›</Text>
              </Pressable>
            </View>

            {trendingBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                description="Explore this book and add it to your personal reading list."
                onPress={() => openBookDetails(book)}
              />
            ))}
          </>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTabBar
        activeTab="discover"
        onTabPress={handleTabPress}
      />
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
    marginBottom: 22,
  },

  heading: {
    fontFamily: typography.bold,
    fontSize: 24,
    color: COLORS.darkGreen,
  },

  subtitle: {
    fontFamily: typography.regular,
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 5,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 52,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  searchIcon: {
    fontSize: 25,
    color: COLORS.primary,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontFamily: typography.regular,
    fontSize: 13,
    color: COLORS.darkGreen,
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

  seeAll: {
    fontFamily: typography.semiBold,
    fontSize: 12,
    color: COLORS.primary,
  },

  resultCount: {
    fontFamily: typography.regular,
    fontSize: 11,
    color: COLORS.gray,
  },

  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 25,
  },

  categoryChip: {
    backgroundColor: COLORS.lightGreen,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  selectedCategoryChip: {
    backgroundColor: COLORS.primary,
  },

  categoryText: {
    fontFamily: typography.medium,
    fontSize: 12,
    color: COLORS.darkGreen,
  },

  selectedCategoryText: {
    color: COLORS.white,
  },

  bookList: {
    gap: 14,
    paddingBottom: 10,
  },
});
