
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Bookmark } from "lucide-react-native";

import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { ReadingStatus } from "@/models/Book";

interface BookDetailsViewProps {
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  subjects: string[];
  firstPublishDate: string;
  isLoading: boolean;
  error: string;
  goBack: () => void;
  readingStatus: ReadingStatus;
  selectReadingStatus: (status: ReadingStatus) => void;
  isSaving: boolean;
  saveMessage: string;
  handleSaveBook: () => void;
}

export default function BookDetailsView({
  title,
  author,
  coverUrl,
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
}: BookDetailsViewProps) {
  const statuses: ReadingStatus[] = [
    "Want to Read",
    "Reading",
    "Completed",
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.iconButton}>
          <ArrowLeft size={23} color={COLORS.darkGreen} />
        </Pressable>

        <Text style={styles.headerTitle}>Book Details</Text>

        <View style={styles.iconButton}>
          <Bookmark size={22} color={COLORS.darkGreen} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Book Cover */}
        <View style={styles.coverContainer}>
          {coverUrl ? (
            <Image
              source={{ uri: coverUrl }}
              style={styles.cover}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.cover, styles.noCover]}>
              <Text style={styles.noCoverText}>
                No Cover Available
              </Text>
            </View>
          )}
        </View>

        {/* Book Information */}
        <View style={styles.bookInfo}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>by {author}</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this Book</Text>

          {isLoading ? (
            <ActivityIndicator color={COLORS.primary} />
          ) : (
            <Text style={styles.description}>{description}</Text>
          )}

          {!!error && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>

        {/* Publication Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Publication Information
          </Text>

          <Text style={styles.infoText}>
            First Published: {firstPublishDate}
          </Text>
        </View>

        {/* Subjects */}
        {subjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Subjects</Text>

            <View style={styles.subjectContainer}>
              {subjects.slice(0, 8).map((subject, index) => (
                <View
                  key={`${subject}-${index}`}
                  style={styles.subjectTag}
                >
                  <Text style={styles.subjectText}>
                    {subject}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Reading Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reading Status</Text>

          <View style={styles.statusContainer}>
            {statuses.map((status) => {
              const isSelected = readingStatus === status;

              return (
                <Pressable
                  key={status}
                  onPress={() => selectReadingStatus(status)}
                  style={[
                    styles.statusButton,
                    isSelected && styles.selectedStatus,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      isSelected && styles.selectedStatusText,
                    ]}
                  >
                    {status}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Save Button */}
        <Pressable
          style={[
            styles.saveButton,
            isSaving && { opacity: 0.7 },
          ]}
          onPress={handleSaveBook}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.saveButtonText}>Save Book</Text>
          )}
        </Pressable>

        {saveMessage !== "" && (
          <Text style={styles.saveMessage}>
            {saveMessage}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: typography.semiBold,
    fontSize: 18,
    color: COLORS.darkGreen,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  coverContainer: {
    alignItems: "center",
    marginTop: 18,
  },
  cover: {
    width: 175,
    height: 255,
    borderRadius: 12,
  },
  noCover: {
    backgroundColor: COLORS.lightGreen,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  noCoverText: {
    fontFamily: typography.medium,
    color: COLORS.darkGreen,
    textAlign: "center",
  },
  bookInfo: {
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 22,
  },
  title: {
    fontFamily: typography.bold,
    fontSize: 23,
    color: COLORS.darkGreen,
    textAlign: "center",
  },
  author: {
    fontFamily: typography.regular,
    fontSize: 15,
    color: COLORS.gray,
    marginTop: 7,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 26,
  },
  sectionTitle: {
    fontFamily: typography.semiBold,
    fontSize: 17,
    color: COLORS.darkGreen,
    marginBottom: 10,
  },
  description: {
    fontFamily: typography.regular,
    fontSize: 14,
    lineHeight: 23,
    color: COLORS.gray,
  },
  error: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: COLORS.error,
    marginTop: 8,
  },
  infoText: {
    fontFamily: typography.regular,
    fontSize: 14,
    color: COLORS.gray,
  },
  subjectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  subjectTag: {
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  subjectText: {
    fontFamily: typography.medium,
    fontSize: 12,
    color: COLORS.darkGreen,
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statusButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  selectedStatus: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusText: {
    fontFamily: typography.medium,
    fontSize: 12,
    color: COLORS.darkGreen,
  },
  selectedStatusText: {
    color: COLORS.white,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    marginTop: 28,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  saveButtonText: {
    fontFamily: typography.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
saveMessage: {
  fontFamily: typography.medium,
  fontSize: 13,
  color: COLORS.primary,
  textAlign: "center",
  marginHorizontal: 20,
  marginBottom: 20,
},
});
