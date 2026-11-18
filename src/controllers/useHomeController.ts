
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import { getTrendingBooks } from "@/services/bookService";
import { getLibraryBooks } from "@/services/libraryService";
import { Book, LibraryBook } from "@/models/Book";

export function useHomeController() {
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>([]);
  const [libraryBooks, setLibraryBooks] = useState<LibraryBook[]>([]);
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

    const loadLibrary = async () => {
      try {
        const data = await getLibraryBooks();
        setLibraryBooks(data);
      } catch (error) {
        console.log("Library loading error:", error);
      }
    };

    loadBooks();
    loadLibrary();
  }, []);

  const handleBookPress = (book: Book | LibraryBook) => {
    const id = "bookId" in book ? book.bookId : book.id;

    router.push({
      pathname: "/book-details",
      params: {
        id,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl || "",
        publishYear: String(book.publishYear || ""),
      },
    });
  };

  const handleTabPress = (tab: string) => {
    if (tab === "discover") {
      router.push("/discover");
    }
  };

  return {
    books,
    libraryBooks,
    loading,
    handleBookPress,
    handleTabPress,
  };
}
