import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Book } from "@/models/Book";
import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";

interface BookCardProps {
  book: Book;
  description?: string;
  onPress?: () => void;
}

export default function BookCard({ book, description, onPress }: BookCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {book.coverUrl ? (
        <Image
          source={{ uri: book.coverUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.cover} />
      )}

      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>

        {description && (
          <Text style={styles.description}>{description}</Text>
        )}

        {book.publishYear && (
          <Text style={styles.description}>
            Published: {book.publishYear}
          </Text>
        )}
      </View>

      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cover: {
    width: 65,
    height: 90,
    borderRadius: 8,
    backgroundColor: COLORS.lightGreen,
  },
  info: {
    flex: 1,
    marginLeft: 13,
  },
  title: {
    fontFamily: typography.semiBold,
    fontSize: 13,
    color: COLORS.darkGreen,
    marginTop: 8,
  },
  author: {
    fontFamily: typography.regular,
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 4,
  },
  description: {
    fontFamily: typography.regular,
    fontSize: 10,
    color: COLORS.gray,
    marginTop: 8,
    lineHeight: 15,
  },
  arrow: {
    fontSize: 25,
    color: COLORS.primary,
    marginLeft: 5,
  },
});
