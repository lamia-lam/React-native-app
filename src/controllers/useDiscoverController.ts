
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { searchBooks, getTrendingBooks } from "@/services/bookService";
import { Book } from "@/models/Book";

const CATEGORIES = [
  "Fiction",
  "Romance",
  "Mystery",
  "Fantasy",
  "Science",
  "Self-help",
];

const API_ERROR_MESSAGE = "Book service is temporarily unavailable.";

export function useDiscoverController() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(true);

  // Search books
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setError("");
      setSelectedCategory(null);
      return;
    }

    try {
      setIsSearching(true);
      setError("");
      setSelectedCategory(null);

      const results = await searchBooks(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.log("Search error:", error);
      setSearchResults([]);

      if (error instanceof Error && error.message === API_ERROR_MESSAGE) {
        setError(API_ERROR_MESSAGE);
      }
    } finally {
      setIsSearching(false);
    }
  };

  // Load trending books
  useEffect(() => {
    const loadTrendingBooks = async () => {
      try {
        const results = await getTrendingBooks();
        setTrendingBooks(results);
      } catch (error) {
        console.log("Trending books error:", error);

        if (error instanceof Error && error.message === API_ERROR_MESSAGE) {
          setError(API_ERROR_MESSAGE);
        }
      } finally {
        setIsLoadingTrending(false);
      }
    };

    loadTrendingBooks();
  }, []);

  // Handle search input changes
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setSelectedCategory(null);
    setError("");

    if (!text.trim()) {
      setSearchResults([]);
    }
  };

  // Handle category selection
  const handleCategoryPress = async (category: string) => {
    try {
      setSelectedCategory(category);
      setSearchQuery(category);
      setIsSearching(true);
      setError("");

      const results = await searchBooks(category);
      setSearchResults(results);
    } catch (error) {
      console.log("Category search error:", error);
      setSearchResults([]);

      if (error instanceof Error && error.message === API_ERROR_MESSAGE) {
        setError(API_ERROR_MESSAGE);
      }
    } finally {
      setIsSearching(false);
    }
  };

  // Handle bottom tab navigation
  const handleTabPress = (tab: string) => {
    if (tab === "home") {
      router.replace("/home");
    }
  };

  // Navigate to Book Details
  const openBookDetails = (book: Book) => {
    router.push({
      pathname: "/book-details",
      params: {
        id: book.id,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl || "",
        publishYear: book.publishYear?.toString() || "",
      },
    });
  };

  return {
    searchQuery,
    handleSearchChange,
    handleSearch,
    searchResults,
    isSearching,
    error,

    trendingBooks,
    isLoadingTrending,

    categories: CATEGORIES,
    selectedCategory,
    handleCategoryPress,

    handleTabPress,
    openBookDetails,
  };
}
