
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { auth, db } from "@/config/firebase";
import { ReadingStatus, LibraryBook } from "@/models/Book";

interface SaveBookData {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  publishYear: string;
  readingStatus: ReadingStatus;
}

// Save a book to the user's library
export const saveBookToLibrary = async (book: SaveBookData) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please log in to save books.");
  }

  const safeBookId = book.id.replace(/\//g, "_");

  const bookRef = doc(
    db,
    "users",
    user.uid,
    "library",
    safeBookId
  );

  await setDoc(
    bookRef,
    {
      bookId: book.id,
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
      publishYear: book.publishYear,
      readingStatus: book.readingStatus,
      savedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

// Retrieve all books from the user's library
export const getLibraryBooks = async (): Promise<LibraryBook[]> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please log in to view your library.");
  }

  const libraryRef = collection(
    db,
    "users",
    user.uid,
    "library"
  );

  const snapshot = await getDocs(libraryRef);

  return snapshot.docs.map((document) => {
    const data = document.data();

    return {
      id: document.id,
      bookId: data.bookId,
      title: data.title,
      author: data.author,
      coverUrl: data.coverUrl,
      publishYear: data.publishYear,
      readingStatus: data.readingStatus,
      currentPage: Number(data.currentPage ?? 0),
      totalPages: Number(data.totalPages ?? 0),
      updatedAt:
        data.updatedAt?.toMillis?.() ??
        data.savedAt?.toMillis?.() ??
        0,
    };
  });
};

// Update a book's reading status
export const updateBookStatus = async (
  bookId: string,
  readingStatus: ReadingStatus
) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please log in to update your library.");
  }

  const safeBookId = bookId.replace(/\//g, "_");

  const bookRef = doc(
    db,
    "users",
    user.uid,
    "library",
    safeBookId
  );

  await updateDoc(bookRef, {
    readingStatus,
    updatedAt: serverTimestamp(),
  });
};

// Update a book's reading progress
export const updateReadingProgress = async (
  bookId: string,
  currentPage: number,
  totalPages: number
): Promise<ReadingStatus> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please log in to update reading progress.");
  }

  if (
    !Number.isInteger(currentPage) ||
    !Number.isInteger(totalPages) ||
    totalPages <= 0 ||
    currentPage < 0 ||
    currentPage > totalPages
  ) {
    throw new Error("Please enter valid page numbers.");
  }

  const safeBookId = bookId.replace(/\//g, "_");

  const bookRef = doc(
    db,
    "users",
    user.uid,
    "library",
    safeBookId
  );

  const nextStatus: ReadingStatus =
    currentPage >= totalPages ? "Completed" : "Reading";

  await updateDoc(bookRef, {
    currentPage,
    totalPages,
    readingStatus: nextStatus,
    updatedAt: serverTimestamp(),
  });

  return nextStatus;
};

// Delete a book from the user's library
export const deleteBookFromLibrary = async (bookId: string) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please log in to delete books.");
  }

  const safeBookId = bookId.replace(/\//g, "_");

  const bookRef = doc(
    db,
    "users",
    user.uid,
    "library",
    safeBookId
  );

  await deleteDoc(bookRef);
};
