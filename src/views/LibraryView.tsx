
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LibraryBook, ReadingStatus } from "@/models/Book";
import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";
import BottomTabBar from "@/views/components/BottomTabBar";

type LibraryFilter = "All" | ReadingStatus;

interface LibraryViewProps {
  books: LibraryBook[];
  filteredBooks: LibraryBook[];
  activeFilter: LibraryFilter;
  setActiveFilter: (filter: LibraryFilter) => void;
  filterOptions: LibraryFilter[];
  isLoading: boolean;
  error: string;
  handleStatusChange: (
    bookId: string,
    newStatus: ReadingStatus
  ) => void;
  handleProgressChange: (
    bookId: string,
    currentPage: number,
    totalPages: number
  ) => Promise<void>;
  handleDeleteBook: (
    bookId: string,
    bookTitle: string
  ) => void;
  updatingBookId: string;
}

// Reading progress editor
function ReadingProgressEditor({
  book,
  onSave,
  isUpdating,
}: {
  book: LibraryBook;
  onSave: (
    bookId: string,
    currentPage: number,
    totalPages: number
  ) => Promise<void>;
  isUpdating: boolean;
}) {
  const [currentPage, setCurrentPage] = useState(
    String(book.currentPage ?? 0)
  );

  const [totalPages, setTotalPages] = useState(
    String(book.totalPages ?? 0)
  );

  const [localError, setLocalError] = useState("");

  const percentage =
    Number(totalPages) > 0
      ? Math.min(
          100,
          Math.round(
            (Number(currentPage) / Number(totalPages)) * 100
          )
        )
      : 0;

  const saveProgress = async () => {
    const current = Number(currentPage);
    const total = Number(totalPages);

    if (
      currentPage.trim() === "" ||
      totalPages.trim() === "" ||
      !Number.isInteger(current) ||
      !Number.isInteger(total) ||
      total <= 0 ||
      current < 0 ||
      current > total
    ) {
      setLocalError("Please enter valid page numbers.");
      return;
    }

    setLocalError("");
    await onSave(book.id, current, total);
  };

  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressHeading}>
        Reading Progress
      </Text>

      <View style={styles.progressDetails}>
        <Text style={styles.progressPageText}>
          {Number(currentPage) || 0} / {Number(totalPages) || 0} pages
        </Text>

        <Text style={styles.progressPercentage}>
          {percentage}%
        </Text>
      </View>

      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${percentage}%` },
          ]}
        />
      </View>

      <View style={styles.pageInputRow}>
        <View style={styles.pageInputGroup}>
          <Text style={styles.inputLabel}>Current Page</Text>
          <TextInput
            style={styles.pageInput}
            value={currentPage}
            onChangeText={setCurrentPage}
            keyboardType="number-pad"
            placeholder="0"
            placeholderTextColor={COLORS.gray}
          />
        </View>

        <View style={styles.pageInputGroup}>
          <Text style={styles.inputLabel}>Total Pages</Text>
          <TextInput
            style={styles.pageInput}
            value={totalPages}
            onChangeText={setTotalPages}
            keyboardType="number-pad"
            placeholder="300"
            placeholderTextColor={COLORS.gray}
          />
        </View>
      </View>

      {localError !== "" && (
        <Text style={styles.inputError}>{localError}</Text>
      )}

      <Pressable
        style={[
          styles.saveProgressButton,
          isUpdating && styles.disabledButton,
        ]}
        onPress={saveProgress}
        disabled={isUpdating}
      >
        {isUpdating ? (
          <ActivityIndicator color={COLORS.white} size="small" />
        ) : (
          <Text style={styles.saveProgressText}>
            Save Progress
          </Text>
        )}
      </Pressable>
    </View>
  );
}

export default function LibraryView({
  filteredBooks,
  activeFilter,
  setActiveFilter,
  filterOptions,
  isLoading,
  error,
  handleStatusChange,
  handleProgressChange,
  handleDeleteBook,
  updatingBookId,
}: LibraryViewProps) {

  const renderBook = ({ item }: { item: LibraryBook }) => (
    <View style={styles.bookCard}>

      {/* Book Details */}
      <View style={styles.bookTopRow}>
        {item.coverUrl ? (
          <Image
            source={{ uri: item.coverUrl }}
            style={styles.cover}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.cover, styles.noCover]}>
            <Text style={styles.noCoverText}>No Cover</Text>
          </View>
        )}

        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle} numberOfLines={2}>
            {item.title}
          </Text>

          <Text style={styles.author} numberOfLines={1}>
            {item.author}
          </Text>

          <Text style={styles.statusLabel}>
            Reading Status
          </Text>

          <View style={styles.statusOptions}>
            {(
              ["Want to Read", "Reading", "Completed"] as ReadingStatus[]
            ).map((status) => {
              const isSelected = item.readingStatus === status;
              const isUpdating = updatingBookId === item.id;

              return (
                <Pressable
                  key={status}
                  disabled={isUpdating}
                  onPress={() => handleStatusChange(item.id, status)}
                  style={[
                    styles.statusOption,
                    isSelected && styles.selectedStatus,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusOptionText,
                      isSelected && styles.selectedStatusText,
                    ]}
                  >
                    {status === "Want to Read"
                      ? "Want"
                      : status === "Reading"
                      ? "Reading"
                      : "Done"}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      {/* Reading Progress */}
      {item.readingStatus === "Reading" && (
        <ReadingProgressEditor
          key={`${item.id}-${item.currentPage}-${item.totalPages}`}
          book={item}
          onSave={handleProgressChange}
          isUpdating={updatingBookId === item.id}
        />
      )}

      {/* Completed Progress */}
      {item.readingStatus === "Completed" &&
        item.totalPages > 0 && (
          <View style={styles.completedProgress}>
            <Text style={styles.progressHeading}>
              Reading Progress: 100%
            </Text>

            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: "100%" },
                ]}
              />
            </View>
          </View>
        )}

      {/* Delete Icon - Top Right Corner */}
      <Pressable
        style={[
          styles.deleteIconButton,
          updatingBookId === item.id && styles.disabledButton,
        ]}
        onPress={() => handleDeleteBook(item.id, item.title)}
        disabled={updatingBookId === item.id}
      >
        {updatingBookId === item.id ? (
          <ActivityIndicator
            size="small"
            color={COLORS.error}
          />
        ) : (
          <Text style={styles.deleteIcon}>🗑️</Text>
        )}
      </Pressable>

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Library 📚</Text>
        <Text style={styles.subtitle}>
          Your personal book collection
        </Text>
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        {filterOptions.map((filter) => (
          <Pressable
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Book List */}
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.message}>
            Loading your books...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.message}>{error}</Text>
        </View>
      ) : filteredBooks.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyIcon}>📖</Text>
          <Text style={styles.emptyTitle}>
            {activeFilter === "All"
              ? "Your library is empty"
              : "No books in this category"}
          </Text>
          <Text style={styles.message}>
            {activeFilter === "All"
              ? "Discover books and save your favorites here."
              : "Books with this reading status will appear here."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id}
          renderItem={renderBook}
          contentContainerStyle={styles.bookList}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      )}

      <BottomTabBar activeTab="library" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 15,
    paddingBottom: 18,
  },
  heading: {
    fontFamily: typography.bold,
    fontSize: 25,
    color: COLORS.darkGreen,
  },
  subtitle: {
    fontFamily: typography.regular,
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 5,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 18,
    gap: 8,
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontFamily: typography.medium,
    fontSize: 11,
    color: COLORS.darkGreen,
  },
  activeFilterText: {
    color: COLORS.white,
  },
  bookList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bookCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 12,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    position: "relative",
  },
  bookTopRow: {
    flexDirection: "row",
  },
  cover: {
    width: 75,
    height: 110,
    borderRadius: 8,
  },
  noCover: {
    backgroundColor: COLORS.lightGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  noCoverText: {
    fontFamily: typography.medium,
    fontSize: 11,
    color: COLORS.darkGreen,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
    paddingRight: 28,
  },
  bookTitle: {
    fontFamily: typography.semiBold,
    fontSize: 15,
    color: COLORS.darkGreen,
  },
  author: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 6,
  },
  statusLabel: {
    fontFamily: typography.medium,
    fontSize: 10,
    color: COLORS.gray,
    marginTop: 10,
    marginBottom: 5,
  },
  statusOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  statusOption: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedStatus: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusOptionText: {
    fontFamily: typography.medium,
    fontSize: 11,
    color: COLORS.darkGreen,
  },
  selectedStatusText: {
    color: COLORS.white,
  },
  progressContainer: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  progressHeading: {
    fontFamily: typography.semiBold,
    fontSize: 13,
    color: COLORS.darkGreen,
    marginBottom: 9,
  },
  progressDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  progressPageText: {
    fontFamily: typography.regular,
    fontSize: 11,
    color: COLORS.gray,
  },
  progressPercentage: {
    fontFamily: typography.semiBold,
    fontSize: 11,
    color: COLORS.primary,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  pageInputRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },
  pageInputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontFamily: typography.medium,
    fontSize: 11,
    color: COLORS.darkGreen,
    marginBottom: 6,
  },
  pageInput: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontFamily: typography.regular,
    fontSize: 13,
    color: COLORS.darkGreen,
  },
  saveProgressButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: "center",
    marginTop: 12,
  },
  saveProgressText: {
    fontFamily: typography.semiBold,
    fontSize: 12,
    color: COLORS.white,
  },
  deleteIconButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FCEAEA",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  deleteIcon: {
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  inputError: {
    color: COLORS.error,
    fontFamily: typography.regular,
    fontSize: 11,
    marginTop: 7,
  },
  completedProgress: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyIcon: {
    fontSize: 45,
    marginBottom: 12,
  },
  emptyTitle: {
    fontFamily: typography.semiBold,
    fontSize: 17,
    color: COLORS.darkGreen,
    textAlign: "center",
  },
  message: {
    fontFamily: typography.regular,
    fontSize: 13,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 8,
  },
});
