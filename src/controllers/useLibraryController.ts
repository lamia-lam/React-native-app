
import { useEffect, useState } from "react";

import {
  getLibraryBooks,
  updateBookStatus,
  updateReadingProgress,
} from "@/services/libraryService";

import { LibraryBook, ReadingStatus } from "@/models/Book";

type LibraryFilter = "All" | ReadingStatus;

export function useLibraryController() {
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [activeFilter, setActiveFilter] =
    useState<LibraryFilter>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingBookId, setUpdatingBookId] = useState("");

  const loadBooks = async () => {
    try {
      setIsLoading(true);
      setError("");

      const result = await getLibraryBooks();
      setBooks(result);
    } catch (err) {
      console.log("Library loading error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your library."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // Update a book's reading status
  const handleStatusChange = async (
    bookId: string,
    newStatus: ReadingStatus
  ) => {
    try {
      setUpdatingBookId(bookId);

      await updateBookStatus(bookId, newStatus);

      setBooks((previousBooks) =>
        previousBooks.map((book) =>
          book.id === bookId
            ? { ...book, readingStatus: newStatus }
            : book
        )
      );
    } catch (err) {
      console.log("Status update error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update reading status."
      );
    } finally {
      setUpdatingBookId("");
    }
  };

  // Update reading progress
  const handleProgressChange = async (
    bookId: string,
    currentPage: number,
    totalPages: number
  ) => {
    try {
      setUpdatingBookId(bookId);
      setError("");

      const newStatus = await updateReadingProgress(
        bookId,
        currentPage,
        totalPages
      );

      setBooks((previousBooks) =>
        previousBooks.map((book) =>
          book.id === bookId
            ? {
                ...book,
                currentPage,
                totalPages,
                readingStatus: newStatus,
              }
            : book
        )
      );
    } catch (err) {
      console.log("Progress update error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update reading progress."
      );
    } finally {
      setUpdatingBookId("");
    }
  };

  const filteredBooks =
    activeFilter === "All"
      ? books
      : books.filter(
          (book) => book.readingStatus === activeFilter
        );

  const filterOptions: LibraryFilter[] = [
    "All",
    "Want to Read",
    "Reading",
    "Completed",
  ];

  return {
    books,
    filteredBooks,
    activeFilter,
    setActiveFilter,
    filterOptions,
    isLoading,
    error,
    loadBooks,
    handleStatusChange,
    handleProgressChange,
    updatingBookId,
  };
}
