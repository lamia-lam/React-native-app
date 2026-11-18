import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getTrendingBooks } from "@/services/bookService";
import { Book } from "@/models/Book";

export function useHomeController() {
  const router = useRouter();

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

  const handleTabPress = (tab: string) => {
    if (tab === "discover") {
      router.push("/discover");
    }
    // Other tabs can be added here as screens are built
  };

  return {
    books,
    loading,
    handleTabPress,
  };
}
