export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
  publishYear?: number;
}

export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

export interface TrendingResponse {
  works: OpenLibraryBook[];
}

export interface SearchResponse {
  docs: OpenLibraryBook[];
}

export interface LibraryBook {
  id: string;
  bookId: string;
  title: string;
  author: string;
  coverUrl: string;
  publishYear: string;
  readingStatus: ReadingStatus;
  currentPage: number;
  totalPages: number;
}


export type ReadingStatus = "Want to Read" | "Reading" | "Completed";

