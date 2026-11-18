import {
  Book,
  OpenLibraryBook,
  TrendingResponse,
  SearchResponse,
} from "@/models/Book";

export type { Book };

const BASE_URL = "https://openlibrary.org";

// Convert Open Library data into our Book format
const formatBook = (item: OpenLibraryBook): Book => ({
  id: item.key,
  title: item.title,
  author: item.author_name?.join(", ") || "Unknown Author",
  coverUrl: item.cover_i
    ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
    : null,
  publishYear: item.first_publish_year,
});

// Get trending books
export const getTrendingBooks = async (): Promise<Book[]> => {
  const response = await fetch(
    `${BASE_URL}/trending/daily.json?limit=12`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch trending books.");
  }

  const data: TrendingResponse = await response.json();

  return (data.works || []).map(formatBook);
};

// Search books by title or author
export const searchBooks = async (
  query: string
): Promise<Book[]> => {
  if (!query.trim()) return [];

  const response = await fetch(
    `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,cover_i,first_publish_year`
  );

  if (!response.ok) {
    throw new Error("Unable to search books.");
  }

  const data: SearchResponse = await response.json();

  return (data.docs || []).map(formatBook);
};
// Get full details of a selected book
export const getBookDetails = async (bookId: string) => {
  const formattedId = bookId.replace("/works/", "");

  const response = await fetch(
    `${BASE_URL}/works/${formattedId}.json`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch book details.");
  }

  const data = await response.json();

  return {
    id: bookId,
    title: data.title || "Unknown Title",
    description:
      typeof data.description === "string"
        ? data.description
        : data.description?.value || "No description available.",
    subjects: data.subjects || [],
    firstPublishDate: data.first_publish_date || "Not available",
  };
};