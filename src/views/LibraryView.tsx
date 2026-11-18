
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
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
  updatingBookId: string;
}

export default function LibraryView({
  filteredBooks,
  activeFilter,
  setActiveFilter,
  filterOptions,
  isLoading,
  error,
  handleStatusChange,
  updatingBookId,
}: LibraryViewProps) {
  const renderBook = ({ item }: { item: LibraryBook }) => (
    <View style={styles.bookCard}>
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

        <Text style={styles.statusLabel}>Reading Status</Text>

        <View style={styles.statusOptions}>
          {(["Want to Read", "Reading", "Completed"] as ReadingStatus[]).map(
            (status) => {
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
            }
          )}
        </View>

        {updatingBookId === item.id && (
          <ActivityIndicator
            size="small"
            color={COLORS.primary}
            style={styles.updateLoader}
          />
        )}
      </View>
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

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.message}>Loading your books...</Text>
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
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 12,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
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
  updateLoader: {
    marginTop: 5,
    alignSelf: "flex-start",
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
