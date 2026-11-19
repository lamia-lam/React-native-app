
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getBookDetails } from "@/services/bookService";
import { ReadingStatus } from "@/models/Book";
import { saveBookToLibrary } from "@/services/libraryService";
export function useBookDetailsController() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const {
    id,
    title,
    author,
    coverUrl,
    publishYear,
  } = useLocalSearchParams<{
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    publishYear: string;
  }>();

  const [readingStatus, setReadingStatus] =
    useState<ReadingStatus>("Want to Read");

  const [description, setDescription] = useState(
    "Loading description..."
  );
  const [subjects, setSubjects] = useState<string[]>([]);
  const [firstPublishDate, setFirstPublishDate] = useState(
    publishYear || "Not available"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Select reading status
  const selectReadingStatus = (status: ReadingStatus) => {
    setReadingStatus(status);
  };
const handleSaveBook = async () => {
  try {
    setIsSaving(true);
    setSaveMessage("");

    await saveBookToLibrary({
      id: String(id),
      title: String(title || "Unknown Title"),
      author: String(author || "Unknown Author"),
      coverUrl: String(coverUrl || ""),
      publishYear: String(publishYear || ""),
      readingStatus,
    });

    setSaveMessage("Book saved to your library!");
  } catch (error) {
    console.log("Save book error:", error);
    setSaveMessage(
      error instanceof Error
        ? error.message
        : "Unable to save book. Please try again."
    );
  } finally {
    setIsSaving(false);
  }
};
  useEffect(() => {
    const loadBookDetails = async () => {
      if (!id) {
        setError("Book information is missing.");
        setIsLoading(false);
        return;
      }

      try {
        const details = await getBookDetails(id);

        setDescription(details.description);
        setSubjects(details.subjects);
        setFirstPublishDate(
          details.firstPublishDate || publishYear || "Not available"
        );
      } catch (err) {
        console.log("Book details error:", err);
        setDescription("Description is currently unavailable.");
        setError("Some book information could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBookDetails();
  }, [id, publishYear]);

  const goBack = () => router.back();

  return {
    title: title || "Unknown Title",
    author: author || "Unknown Author",
    coverUrl: coverUrl || "",
    description,
    subjects,
    firstPublishDate,
    isLoading,
    error,
    goBack,
    readingStatus,
    selectReadingStatus,
    isSaving,
    saveMessage,
    handleSaveBook,
  };
}
