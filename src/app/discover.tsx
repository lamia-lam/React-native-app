
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  searchBooks,
  getTrendingBooks,
  Book,
} from "@/services/bookService";

import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";

export default function DiscoverScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(true);

  const categories = [
    "Fiction",
    "Romance",
    "Mystery",
    "Fantasy",
    "Science",
    "Self-help",
  ];

  // Search books using Open Library API
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);

      const results = await searchBooks(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.log("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Load trending books when the screen opens
  useEffect(() => {
    const loadTrendingBooks = async () => {
      try {
        const results = await getTrendingBooks();
        setTrendingBooks(results);
      } catch (error) {
        console.log("Trending books error:", error);
      } finally {
        setIsLoadingTrending(false);
      }
    };

    loadTrendingBooks();
  }, []);

  // Clear results when the search field is cleared
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);

    if (!text.trim()) {
      setSearchResults([]);
    }
  };

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
          {categories.map((category) => (
            <Pressable key={category} style={styles.categoryChip}>
              <Text style={styles.categoryText}>{category}</Text>
            </Pressable>
          ))}
        </View>

        {/* Search Results */}
        {isSearching ? (
          <Text style={styles.subtitle}>Searching books...</Text>
        ) : searchQuery.trim() !== "" ? (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Search Results</Text>
              {searchResults.length > 0 && (
                <Text style={styles.bookAuthor}>
                  {searchResults.length} books found
                </Text>
              )}
            </View>

            {searchResults.length > 0 ? (
              searchResults.map((book) => (
                <Pressable key={book.id} style={styles.popularCard}>
                  {book.coverUrl ? (
                    <Image
                      source={{ uri: book.coverUrl }}
                      style={styles.popularCover}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.popularCover} />
                  )}

                  <View style={styles.popularInfo}>
                    <Text style={styles.bookTitle}>
                      {book.title}
                    </Text>

                    <Text style={styles.bookAuthor}>
                      {book.author}
                    </Text>

                    {book.publishYear && (
                      <Text style={styles.description}>
                        Published: {book.publishYear}
                      </Text>
                    )}
                  </View>

                  <Text style={styles.arrow}>›</Text>
                </Pressable>
              ))
            ) : (
              <Text style={styles.subtitle}>
                No books found. Try another title or author.
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
                  <Pressable key={book.id} style={styles.bookItem}>
                    {book.coverUrl ? (
                      <Image
                        source={{ uri: book.coverUrl }}
                        style={styles.bookCover}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.bookCover} />
                    )}

                    <Text
                      style={styles.bookTitle}
                      numberOfLines={2}
                    >
                      {book.title}
                    </Text>

                    <Text
                      style={styles.bookAuthor}
                      numberOfLines={1}
                    >
                      {book.author}
                    </Text>
                  </Pressable>
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
              <Pressable key={book.id} style={styles.popularCard}>
                {book.coverUrl ? (
                  <Image
                    source={{ uri: book.coverUrl }}
                    style={styles.popularCover}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.popularCover} />
                )}

                <View style={styles.popularInfo}>
                  <Text style={styles.bookTitle}>
                    {book.title}
                  </Text>

                  <Text style={styles.bookAuthor}>
                    {book.author}
                  </Text>

                  <Text style={styles.description}>
                    Explore this book and add it to your personal reading list.
                  </Text>
                </View>

                <Text style={styles.arrow}>›</Text>
              </Pressable>
            ))}
          </>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <Pressable
          style={styles.tabItem}
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.tabIcon}>⌂</Text>
          <Text style={styles.tabText}>Home</Text>
        </Pressable>

        <Pressable style={styles.tabItem}>
          <Text style={styles.activeTabIcon}>⌕</Text>
          <Text style={styles.activeTabText}>Discover</Text>
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

  categoryText: {
    fontFamily: typography.medium,
    fontSize: 12,
    color: COLORS.darkGreen,
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

  bookTitle: {
    fontFamily: typography.semiBold,
    fontSize: 13,
    color: COLORS.darkGreen,
    marginTop: 8,
  },

  bookAuthor: {
    fontFamily: typography.regular,
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 4,
  },

  popularCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  popularCover: {
    width: 65,
    height: 90,
    borderRadius: 8,
    backgroundColor: COLORS.lightGreen,
  },

  popularInfo: {
    flex: 1,
    marginLeft: 13,
  },

  description: {
    fontFamily: typography.regular,
    fontSize: 10,
    color: COLORS.gray,
    marginTop: 8,
    lineHeight: 15,
  },

  arrow: {
    fontSize: 25,
    color: COLORS.primary,
    marginLeft: 5,
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
