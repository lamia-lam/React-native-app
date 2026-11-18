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

export function useDiscoverController() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(true);

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

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchResults([]);
    }
  };

  const handleTabPress = (tab: string) => {
    if (tab === "home") {
      router.replace("/home");
    }
    // Other tabs can be added here as screens are built
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
    trendingBooks,
    isLoadingTrending,
    categories: CATEGORIES,
    handleTabPress,
    openBookDetails,
  };
}
