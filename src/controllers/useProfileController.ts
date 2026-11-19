
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import {
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";

import { auth } from "@/config/firebase";
import { logoutUser } from "@/services/authService";
import { getLibraryBooks } from "@/services/libraryService";
import { LibraryBook } from "@/models/Book";

export function useProfileController() {
  const router = useRouter();

  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const result = await getLibraryBooks();
        setBooks(result);
      } catch (error) {
        console.log("Profile library error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  const totalBooks = books.length;

  const readingBooks = books.filter(
    (book) => book.readingStatus === "Reading"
  ).length;

  const completedBooks = books.filter(
    (book) => book.readingStatus === "Completed"
  ).length;

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await logoutUser();

      router.replace("/login");
    } catch (error) {
      console.log("Logout error:", error);
      Alert.alert("Logout Failed", "Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    user,
    books,
    totalBooks,
    readingBooks,
    completedBooks,
    isLoading,
    onLogout: handleLogout,
    isLoggingOut,
  };
}
