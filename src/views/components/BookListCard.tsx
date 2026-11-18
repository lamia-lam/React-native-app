import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Book } from "@/models/Book";
import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";

interface BookListCardProps {
  book: Book;
  onPress?: () => void;
}

export default function BookListCard({ book, onPress }: BookListCardProps) {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      {book.coverUrl ? (
        <Image
          source={{ uri: book.coverUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.emptyCover}>
          <Text>📖</Text>
        </View>
      )}

      <Text style={styles.title} numberOfLines={2}>
        {book.title}
      </Text>

      <Text style={styles.author} numberOfLines={1}>
        {book.author}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 112,
  },
  cover: {
    width: 112,
    height: 155,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen,
  },
  emptyCover: {
    width: 112,
    height: 155,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: typography.semiBold,
    fontSize: 12,
    color: COLORS.darkGreen,
    marginTop: 8,
  },
  author: {
    fontFamily: typography.regular,
    fontSize: 10,
    color: COLORS.gray,
    marginTop: 3,
  },
});
