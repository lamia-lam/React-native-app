
const BASE_URL = "https://openlibrary.org";

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
  publishYear?: number;
}

interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

interface TrendingResponse {
  works: OpenLibraryBook[];
}

interface SearchResponse {
  docs: OpenLibraryBook[];
}

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
